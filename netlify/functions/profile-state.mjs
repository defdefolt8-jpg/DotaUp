import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

const COOKIE_NAME = "dotaup_steam_session";
const MAX_BODY_BYTES = 256 * 1024;

export default async (request) => {
  const session = readSession(cookie(request.headers.get("cookie"), COOKIE_NAME));
  if (!session) return Response.json({ error: "unauthorized" }, { status: 401, headers: noStoreHeaders() });

  const store = getStore({ name: "dotaup-profiles", consistency: "strong" });
  const key = `steam/${session.steamId}.json`;

  if (request.method === "GET") {
    const profile = await store.get(key, { type: "json", consistency: "strong" });
    return Response.json({ profile: profile || null }, { headers: noStoreHeaders() });
  }

  if (request.method === "PUT") {
    const declaredLength = Number(request.headers.get("content-length") || 0);
    if (declaredLength > MAX_BODY_BYTES) return Response.json({ error: "payload_too_large" }, { status: 413 });

    let payload;
    try { payload = sanitizeProfile(await request.json(), session); }
    catch { return Response.json({ error: "invalid_payload" }, { status: 400 }); }

    await store.setJSON(key, payload);
    return Response.json({ saved: true, updatedAt: payload.updatedAt }, { headers: noStoreHeaders() });
  }

  return Response.json({ error: "method_not_allowed" }, { status: 405, headers: { allow: "GET, PUT" } });
};

function sanitizeProfile(value, session) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid");
  const balance = finiteNumber(value.balance, 0, 100_000_000);
  const ownedIds = numberArray(value.ownedIds, 500);
  return {
    balance,
    ownedIds,
    ownedItems: objectArray(value.ownedItems, 500),
    itemHistory: objectArray(value.itemHistory, 1000),
    gameHistory: objectArray(value.gameHistory, 1000),
    user: {
      name: text(session.displayName, 80),
      steamId: session.steamId,
      avatar: session.avatarUrl ? text(session.avatarUrl, 500) : null,
    },
    updatedAt: new Date().toISOString(),
  };
}

function objectArray(value, max) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, max).filter(item => item && typeof item === "object" && !Array.isArray(item));
}
function numberArray(value, max) { return Array.isArray(value) ? [...new Set(value.slice(0, max).map(Number).filter(Number.isSafeInteger))] : []; }
function finiteNumber(value, min, max) { const number = Number(value); if (!Number.isFinite(number)) throw new Error("invalid"); return Math.min(max, Math.max(min, number)); }
function text(value, max) { return String(value || "").slice(0, max); }
function noStoreHeaders() { return { "cache-control": "no-store" }; }

function readSession(raw) {
  if (!raw) return null;
  const [payload, signature] = raw.split(".");
  if (!payload || !signature) return null;
  const supplied = Buffer.from(signature);
  const expected = Buffer.from(sign(payload));
  if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.steamId && session.expiresAt > Math.floor(Date.now() / 1000) ? session : null;
  } catch { return null; }
}
function sign(value) {
  const secret = process.env.STEAM_SESSION_SECRET;
  if (!secret) throw new Error("STEAM_SESSION_SECRET is missing");
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}
function cookie(header, name) { return header?.split(";").map(value => value.trim()).find(value => value.startsWith(`${name}=`))?.slice(name.length + 1) || null; }
