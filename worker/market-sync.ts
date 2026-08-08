import { MARKET_SEEDS, type MarketSeed } from "./market-catalog";

const APP_ID = 570;
const STEAM_CURRENCY_RUB = 5;
const STALE_MS = 1000 * 60 * 60 * 6;
const STEAM_SEARCH_URL = "https://steamcommunity.com/market/search/render/";
const STEAM_PRICE_URL = "https://steamcommunity.com/market/priceoverview/";
const STEAM_IMAGE_BASE = "https://community.akamai.steamstatic.com/economy/image/";

export interface EnvWithDb {
  DB: D1Database;
}

interface CacheRow {
  item_id: number;
  steam_query: string;
  market_hash_name: string | null;
  market_name: string | null;
  image_url: string | null;
  price_coins: number;
  source_currency: string;
  updated_at: string;
  updated_at_epoch: number;
}

interface SteamSearchResult {
  hash_name?: string;
  name?: string;
  sell_price?: number;
  sell_price_text?: string;
  asset_description?: {
    market_hash_name?: string;
    market_name?: string;
    name?: string;
    icon_url?: string;
  };
}

interface SteamSearchResponse {
  success?: boolean;
  results?: SteamSearchResult[];
}

interface SteamPriceResponse {
  success?: boolean;
  lowest_price?: string;
  median_price?: string;
  volume?: string;
}

export async function ensureMarketSchema(env: EnvWithDb) {
  await env.DB.batch([
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS market_cache (
        item_id INTEGER PRIMARY KEY,
        steam_query TEXT NOT NULL,
        market_hash_name TEXT,
        market_name TEXT,
        image_url TEXT,
        price_coins INTEGER NOT NULL,
        source_currency TEXT NOT NULL DEFAULT 'RUB',
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at_epoch INTEGER NOT NULL
      )
    `),
    env.DB.prepare(`
      CREATE INDEX IF NOT EXISTS idx_market_cache_updated_at_epoch
      ON market_cache(updated_at_epoch)
    `),
    env.DB.prepare("PRAGMA optimize"),
  ]);
}

export async function getMarketPayload(env: EnvWithDb, ctx?: ExecutionContext) {
  await ensureMarketSchema(env);
  const cached = await getCachedRows(env);
  const stale = isStale(cached);

  if (!cached.length) {
    const fresh = await syncSteamCatalog(env);
    return formatPayload(fresh, "live");
  }

  if (stale && ctx) {
    ctx.waitUntil(syncSteamCatalog(env));
  }

  return formatPayload(cached, stale ? "refreshing" : "cached");
}

async function getCachedRows(env: EnvWithDb) {
  const result = await env.DB
    .prepare(`
      SELECT item_id, steam_query, market_hash_name, market_name, image_url, price_coins, source_currency, updated_at, updated_at_epoch
      FROM market_cache
      ORDER BY item_id ASC
    `)
    .all<CacheRow>();
  return result.results ?? [];
}

function isStale(rows: CacheRow[]) {
  if (!rows.length) return true;
  const lastUpdated = Math.max(...rows.map((row) => row.updated_at_epoch || 0));
  return Date.now() - lastUpdated > STALE_MS;
}

function formatPayload(rows: CacheRow[], status: "live" | "cached" | "refreshing") {
  const syncedAtEpoch = rows.length ? Math.max(...rows.map((row) => row.updated_at_epoch || 0)) : Date.now();
  return {
    status,
    currency: "RUB",
    syncedAt: new Date(syncedAtEpoch).toISOString(),
    items: rows.map((row) => ({
      id: row.item_id,
      price: row.price_coins,
      image: row.image_url,
      marketName: row.market_name || row.market_hash_name || row.steam_query,
      syncedAt: row.updated_at,
    })),
  };
}

export async function syncSteamCatalog(env: EnvWithDb) {
  await ensureMarketSchema(env);
  const existingRows = await getCachedRows(env);
  const existingById = new Map(existingRows.map((row) => [row.item_id, row]));
  const syncedRows = await runWithConcurrency(MARKET_SEEDS, 4, async (seed) => {
    const previous = existingById.get(seed.id);
    return syncSteamItem(seed, previous);
  });

  const statements = syncedRows.map((row) =>
    env.DB.prepare(`
      INSERT INTO market_cache (
        item_id, steam_query, market_hash_name, market_name, image_url, price_coins, source_currency, updated_at, updated_at_epoch
      ) VALUES (?, ?, ?, ?, ?, ?, 'RUB', CURRENT_TIMESTAMP, ?)
      ON CONFLICT(item_id) DO UPDATE SET
        steam_query = excluded.steam_query,
        market_hash_name = excluded.market_hash_name,
        market_name = excluded.market_name,
        image_url = excluded.image_url,
        price_coins = excluded.price_coins,
        source_currency = excluded.source_currency,
        updated_at = CURRENT_TIMESTAMP,
        updated_at_epoch = excluded.updated_at_epoch
    `).bind(
      row.item_id,
      row.steam_query,
      row.market_hash_name,
      row.market_name,
      row.image_url,
      row.price_coins,
      row.updated_at_epoch,
    )
  );

  if (statements.length) {
    await env.DB.batch(statements);
  }

  return getCachedRows(env);
}

async function syncSteamItem(seed: MarketSeed, previous?: CacheRow) {
  const picked = await findSteamListing(seed.steamQuery);
  const marketHashName = picked.marketHashName || previous?.market_hash_name || seed.steamQuery;
  const imageUrl = picked.imageUrl || previous?.image_url || null;
  const priceCoins = await getSteamPrice(marketHashName, picked.priceText, previous?.price_coins ?? 0);

  return {
    item_id: seed.id,
    steam_query: seed.steamQuery,
    market_hash_name: marketHashName,
    market_name: picked.marketName || previous?.market_name || seed.steamQuery,
    image_url: imageUrl,
    price_coins: priceCoins,
    updated_at_epoch: Date.now(),
  };
}

async function findSteamListing(query: string) {
  const url = new URL(STEAM_SEARCH_URL);
  url.searchParams.set("query", query);
  url.searchParams.set("start", "0");
  url.searchParams.set("count", "10");
  url.searchParams.set("search_descriptions", "0");
  url.searchParams.set("sort_column", "name");
  url.searchParams.set("sort_dir", "asc");
  url.searchParams.set("appid", String(APP_ID));
  url.searchParams.set("norender", "1");

  const response = await fetch(url, {
    headers: {
      "accept-language": "ru-RU,ru;q=0.9,en;q=0.8",
      "user-agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Steam search failed with ${response.status}`);
  }

  const data = (await response.json()) as SteamSearchResponse;
  const results = data.results ?? [];
  const exactNeedle = query.trim().toLowerCase();
  const candidate =
    results.find((item) => {
      const values = [
        item.asset_description?.market_hash_name,
        item.asset_description?.market_name,
        item.asset_description?.name,
        item.hash_name,
        item.name,
      ]
        .filter(Boolean)
        .map((value) => String(value).trim().toLowerCase());
      return values.includes(exactNeedle);
    }) || results[0];

  return {
    marketHashName:
      candidate?.asset_description?.market_hash_name ||
      candidate?.asset_description?.market_name ||
      candidate?.hash_name ||
      candidate?.name ||
      query,
    marketName: candidate?.asset_description?.market_name || candidate?.asset_description?.name || candidate?.name || query,
    imageUrl: candidate?.asset_description?.icon_url ? `${STEAM_IMAGE_BASE}${candidate.asset_description.icon_url}/330x192` : null,
    priceText: candidate?.sell_price_text || null,
  };
}

async function getSteamPrice(marketHashName: string, fallbackText: string | null, previousPrice: number) {
  const url = new URL(STEAM_PRICE_URL);
  url.searchParams.set("appid", String(APP_ID));
  url.searchParams.set("currency", String(STEAM_CURRENCY_RUB));
  url.searchParams.set("market_hash_name", marketHashName);

  const response = await fetch(url, {
    headers: {
      "accept-language": "ru-RU,ru;q=0.9,en;q=0.8",
      "user-agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    return normalizeSteamPrice(fallbackText, previousPrice);
  }

  const data = (await response.json()) as SteamPriceResponse;
  const rawPrice = data.lowest_price || data.median_price || fallbackText;
  return normalizeSteamPrice(rawPrice, previousPrice);
}

function normalizeSteamPrice(rawPrice: string | null | undefined, fallback: number) {
  if (!rawPrice) return fallback;
  const sanitized = rawPrice
    .replace(/\s/g, "")
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".");

  const numeric = Number.parseFloat(sanitized);
  if (!Number.isFinite(numeric) || numeric <= 0) return fallback;
  return Math.max(1, Math.round(numeric));
}

async function runWithConcurrency<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>) {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function next() {
    while (index < items.length) {
      const currentIndex = index++;
      results[currentIndex] = await worker(items[currentIndex]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => next()));
  return results;
}
