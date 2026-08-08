CREATE TABLE IF NOT EXISTS market_cache (
  item_id INTEGER PRIMARY KEY NOT NULL,
  steam_query TEXT NOT NULL,
  market_hash_name TEXT,
  market_name TEXT,
  image_url TEXT,
  price_coins INTEGER NOT NULL,
  source_currency TEXT NOT NULL DEFAULT 'RUB',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at_epoch INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_market_cache_updated_at_epoch
ON market_cache(updated_at_epoch);
