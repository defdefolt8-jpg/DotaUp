/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { getMarketPayload, syncSteamCatalog } from "./market-sync";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  STEAM_SESSION_SECRET?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/api/market-items" && request.method === "GET") {
      try {
        const payload = await getMarketPayload(env, ctx);
        return Response.json(payload, {
          headers: {
            "cache-control": "no-store",
          },
        });
      } catch (error) {
        return Response.json({
          status: "error",
          message: error instanceof Error ? error.message : "Failed to load Steam Market data",
        }, { status: 500 });
      }
    }

    if (url.pathname === "/api/market-sync" && request.method === "POST") {
      try {
        const rows = await syncSteamCatalog(env);
        return Response.json({
          status: "live",
          syncedAt: rows.length ? rows[0].updated_at : new Date().toISOString(),
          count: rows.length,
        });
      } catch (error) {
        return Response.json({
          status: "error",
          message: error instanceof Error ? error.message : "Steam sync failed",
        }, { status: 500 });
      }
    }

    if (url.pathname === "/api/auth/steam/login" && request.method === "GET") {
      return startSteamLogin(request);
    }

    if (url.pathname === "/api/auth/steam/callback" && request.method === "GET") {
      return finishSteamLogin(request, env);
    }

    if (url.pathname === "/api/auth/me" && request.method === "GET") {
      const session = await readSteamSession(request, env);
      const profile = session ? await getStoredSteamProfile(env, session).catch(() => ({
        steamId: session.steamId,
        displayName: session.displayName || `Steam ${session.steamId.slice(-4)}`,
        avatarUrl: session.avatarUrl || null,
      })) : null;
      return Response.json({
        authenticated: Boolean(session),
        user: profile ? {
          steamId: profile.steamId,
          displayName: profile.displayName,
          avatar: profile.avatarUrl,
        } : null,
      }, {
        headers: {
          "cache-control": "no-store",
        },
      });
    }

    if (url.pathname === "/api/auth/logout" && (request.method === "GET" || request.method === "POST")) {
      const returnTo = safeReturnTo(url.searchParams.get("return_to"));
      return new Response(null, {
        status: 302,
        headers: {
          location: returnTo,
          "set-cookie": `${STEAM_SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;

const STEAM_OPENID_ENDPOINT = "https://steamcommunity.com/openid/login";
const STEAM_SESSION_COOKIE = "dotaup_steam_session";
const STEAM_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

type SteamSession = {
  steamId: string;
  displayName?: string;
  avatarUrl?: string | null;
  issuedAt: number;
  expiresAt: number;
};

type SteamProfile = {
  steamId: string;
  displayName: string;
  avatarUrl: string | null;
};

function startSteamLogin(request: Request): Response {
  const url = new URL(request.url);
  const origin = url.origin;
  const returnTo = safeReturnTo(url.searchParams.get("return_to") ?? "/site/index.html");
  const callback = new URL("/api/auth/steam/callback", origin);
  callback.searchParams.set("return_to", returnTo);

  const steamUrl = new URL(STEAM_OPENID_ENDPOINT);
  steamUrl.searchParams.set("openid.ns", "http://specs.openid.net/auth/2.0");
  steamUrl.searchParams.set("openid.mode", "checkid_setup");
  steamUrl.searchParams.set("openid.return_to", callback.toString());
  steamUrl.searchParams.set("openid.realm", `${origin}/`);
  steamUrl.searchParams.set("openid.identity", "http://specs.openid.net/auth/2.0/identifier_select");
  steamUrl.searchParams.set("openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select");

  return Response.redirect(steamUrl.toString(), 302);
}

async function finishSteamLogin(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const returnTo = safeReturnTo(url.searchParams.get("return_to"));
  const claimedId = url.searchParams.get("openid.claimed_id") ?? url.searchParams.get("openid.identity") ?? "";
  const steamId = extractSteamId(claimedId);

  if (!steamId) {
    return authError(returnTo, "steam_id_missing");
  }

  const valid = await verifySteamOpenId(url);
  if (!valid) {
    return authError(returnTo, "steam_validation_failed");
  }

  const profile = await fetchSteamProfile(steamId);
  await upsertSteamUser(env, profile).catch(() => undefined);

  return new Response(null, {
    status: 302,
    headers: {
      location: withAuthStatus(returnTo, "ok"),
      "set-cookie": await createSteamSessionCookie(env, profile),
    },
  });
}

function authError(returnTo: string, reason: string): Response {
  const target = new URL(returnTo, "https://dotaup.local");
  target.searchParams.set("auth_error", reason);
  return new Response(null, {
    status: 302,
    headers: {
      location: `${target.pathname}${target.search}${target.hash}`,
    },
  });
}

function withAuthStatus(returnTo: string, status: string): string {
  const target = new URL(returnTo, "https://dotaup.local");
  target.searchParams.set("steam_auth", status);
  return `${target.pathname}${target.search}${target.hash}`;
}

async function verifySteamOpenId(callbackUrl: URL): Promise<boolean> {
  const params = new URLSearchParams();
  callbackUrl.searchParams.forEach((value, key) => {
    if (key.startsWith("openid.")) {
      params.append(key, value);
    }
  });
  params.set("openid.mode", "check_authentication");

  const response = await fetch(STEAM_OPENID_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) return false;
  const body = await response.text();
  return /(^|\n)is_valid\s*:\s*true(\n|$)/.test(body);
}

function extractSteamId(claimedId: string): string | null {
  const match = claimedId.match(/steamcommunity\.com\/openid\/id\/(\d{15,25})(?:\/)?(?:[?#].*)?$/i);
  return match?.[1] ?? null;
}

async function fetchSteamProfile(steamId: string): Promise<SteamProfile> {
  const fallback: SteamProfile = {
    steamId,
    displayName: `Steam ${steamId.slice(-4)}`,
    avatarUrl: null,
  };

  try {
    const response = await fetch(`https://steamcommunity.com/profiles/${steamId}?xml=1`, {
      headers: {
        "user-agent": "DotaUp Steam profile loader",
      },
    });
    if (!response.ok) return fallback;

    const xml = await response.text();
    return {
      steamId,
      displayName: decodeXml(readXmlTag(xml, "steamID")) || fallback.displayName,
      avatarUrl: decodeXml(readXmlTag(xml, "avatarFull")) || decodeXml(readXmlTag(xml, "avatarMedium")) || null,
    };
  } catch {
    return fallback;
  }
}

function readXmlTag(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${tag}>`, "i"));
  return match?.[1]?.trim() ?? null;
}

function decodeXml(value: string | null): string | null {
  if (!value) return null;
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

async function ensureSteamUsersTable(env: Env): Promise<void> {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS steam_users (
      steam_id TEXT PRIMARY KEY,
      display_name TEXT,
      avatar_url TEXT,
      created_at TEXT NOT NULL,
      last_login_at TEXT NOT NULL
    )
  `).run();

  await env.DB.prepare("ALTER TABLE steam_users ADD COLUMN display_name TEXT").run().catch(() => undefined);
  await env.DB.prepare("ALTER TABLE steam_users ADD COLUMN avatar_url TEXT").run().catch(() => undefined);
}

async function getStoredSteamProfile(env: Env, session: SteamSession): Promise<SteamProfile> {
  await ensureSteamUsersTable(env);
  const row = await env.DB.prepare(`
    SELECT steam_id, display_name, avatar_url
    FROM steam_users
    WHERE steam_id = ?1
  `).bind(session.steamId).first<{ steam_id: string; display_name: string | null; avatar_url: string | null }>();

  return {
    steamId: row?.steam_id ?? session.steamId,
    displayName: row?.display_name || session.displayName || `Steam ${session.steamId.slice(-4)}`,
    avatarUrl: row?.avatar_url || session.avatarUrl || null,
  };
}

async function upsertSteamUser(env: Env, profile: SteamProfile): Promise<void> {
  const now = new Date().toISOString();
  await ensureSteamUsersTable(env);
  await env.DB.prepare(`
    INSERT INTO steam_users (steam_id, display_name, avatar_url, created_at, last_login_at)
    VALUES (?1, ?2, ?3, ?4, ?4)
    ON CONFLICT(steam_id) DO UPDATE SET
      display_name = excluded.display_name,
      avatar_url = excluded.avatar_url,
      last_login_at = excluded.last_login_at
  `).bind(profile.steamId, profile.displayName, profile.avatarUrl, now).run();
}

async function createSteamSessionCookie(env: Env, profile: SteamProfile): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const session: SteamSession = {
    steamId: profile.steamId,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    issuedAt: now,
    expiresAt: now + STEAM_SESSION_TTL_SECONDS,
  };
  const payload = base64UrlEncodeString(JSON.stringify(session));
  const signature = await signValue(env, payload);
  return `${STEAM_SESSION_COOKIE}=${payload}.${signature}; Path=/; Max-Age=${STEAM_SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`;
}

async function readSteamSession(request: Request, env: Env): Promise<SteamSession | null> {
  const cookieValue = getCookie(request, STEAM_SESSION_COOKIE);
  if (!cookieValue) return null;
  const [payload, signature] = cookieValue.split(".");
  if (!payload || !signature) return null;

  const expected = await signValue(env, payload);
  if (!safeEqual(signature, expected)) return null;

  try {
    const session = JSON.parse(base64UrlDecodeString(payload)) as SteamSession;
    if (!session.steamId || session.expiresAt < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  const parts = header.split(";").map((part) => part.trim());
  const prefix = `${name}=`;
  const value = parts.find((part) => part.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
}

async function signValue(env: Env, value: string): Promise<string> {
  const secret = env.STEAM_SESSION_SECRET || "dotaup-dev-steam-session-secret-change-me";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return base64UrlEncodeBytes(new Uint8Array(signature));
}

function base64UrlEncodeString(value: string): string {
  return base64UrlEncodeBytes(new TextEncoder().encode(value));
}

function base64UrlEncodeBytes(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecodeString(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

function safeReturnTo(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}
