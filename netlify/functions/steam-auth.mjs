import crypto from "node:crypto";

const OPENID_ENDPOINT = "https://steamcommunity.com/openid/login";
const COOKIE_NAME = "dotaup_steam_session";
const SESSION_TTL = 60 * 60 * 24 * 7;

export default async (request) => {
  const url = new URL(request.url);
  const route = authRoute(url.pathname);

  if (route === "steam/login" && request.method === "GET") return startLogin(url);
  if (route === "steam/callback" && request.method === "GET") return finishLogin(request, url);
  if (route === "me" && request.method === "GET") return currentUser(request);
  if (route === "logout" && (request.method === "GET" || request.method === "POST")) return logout(url);

  return Response.json({ error: "not_found" }, { status: 404 });
};

function authRoute(pathname) {
  const marker = "/steam-auth/";
  const functionIndex = pathname.indexOf(marker);
  if (functionIndex >= 0) return pathname.slice(functionIndex + marker.length).replace(/^\/+|\/+$/g, "");
  const apiIndex = pathname.indexOf("/api/auth/");
  return apiIndex >= 0 ? pathname.slice(apiIndex + 10).replace(/^\/+|\/+$/g, "") : "";
}

function startLogin(url) {
  const returnTo = safeReturnTo(url.searchParams.get("return_to"));
  const callback = new URL("/api/auth/steam/callback", url.origin);
  callback.searchParams.set("return_to", returnTo);
  const steamUrl = new URL(OPENID_ENDPOINT);
  steamUrl.searchParams.set("openid.ns", "http://specs.openid.net/auth/2.0");
  steamUrl.searchParams.set("openid.mode", "checkid_setup");
  steamUrl.searchParams.set("openid.return_to", callback.toString());
  steamUrl.searchParams.set("openid.realm", `${url.origin}/`);
  steamUrl.searchParams.set("openid.identity", "http://specs.openid.net/auth/2.0/identifier_select");
  steamUrl.searchParams.set("openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select");
  return Response.redirect(steamUrl.toString(), 302);
}

async function finishLogin(request, url) {
  const returnTo = safeReturnTo(url.searchParams.get("return_to"));
  const claimedId = url.searchParams.get("openid.claimed_id") || url.searchParams.get("openid.identity") || "";
  const steamId = claimedId.match(/steamcommunity\.com\/openid\/id\/(\d{15,25})/i)?.[1];
  if (!steamId || !(await verifyOpenId(url))) return redirectWith(returnTo, "auth_error", "steam_validation_failed");

  const profile = await fetchProfile(steamId);
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(JSON.stringify({ ...profile, issuedAt: now, expiresAt: now + SESSION_TTL }));
  const value = `${payload}.${sign(payload)}`;
  const target = new URL(returnTo, url.origin);
  target.searchParams.set("steam_auth", "ok");
  return new Response(null, {
    status: 302,
    headers: {
      location: `${target.pathname}${target.search}${target.hash}`,
      "set-cookie": `${COOKIE_NAME}=${value}; Path=/; Max-Age=${SESSION_TTL}; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

async function currentUser(request) {
  const raw = cookie(request.headers.get("cookie"), COOKIE_NAME);
  const session = readSession(raw);
  return Response.json({
    authenticated: Boolean(session),
    user: session ? { steamId: session.steamId, displayName: session.displayName, avatar: session.avatarUrl } : null,
  }, { headers: { "cache-control": "no-store" } });
}

function logout(url) {
  return new Response(null, {
    status: 302,
    headers: {
      location: safeReturnTo(url.searchParams.get("return_to")),
      "set-cookie": `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

async function verifyOpenId(url) {
  const params = new URLSearchParams();
  url.searchParams.forEach((value, key) => { if (key.startsWith("openid.")) params.append(key, value); });
  params.set("openid.mode", "check_authentication");
  const response = await fetch(OPENID_ENDPOINT, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: params });
  return response.ok && /(^|\n)is_valid\s*:\s*true(\n|$)/.test(await response.text());
}

async function fetchProfile(steamId) {
  const fallback = { steamId, displayName: `Steam ${steamId.slice(-4)}`, avatarUrl: null };
  try {
    const response = await fetch(`https://steamcommunity.com/profiles/${steamId}?xml=1`, { headers: { "user-agent": "DotaUp Steam auth" } });
    if (!response.ok) return fallback;
    const xml = await response.text();
    return {
      steamId,
      displayName: decodeXml(tag(xml, "steamID")) || fallback.displayName,
      avatarUrl: decodeXml(tag(xml, "avatarFull")) || decodeXml(tag(xml, "avatarMedium")) || null,
    };
  } catch { return fallback; }
}

function readSession(raw) {
  if (!raw) return null;
  const [payload, signature] = raw.split(".");
  if (!payload || !signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(sign(payload)))) return null;
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

function base64url(value) { return Buffer.from(value, "utf8").toString("base64url"); }
function cookie(header, name) { return header?.split(";").map(v => v.trim()).find(v => v.startsWith(`${name}=`))?.slice(name.length + 1) || null; }
function safeReturnTo(value) { return value?.startsWith("/") && !value.startsWith("//") ? value : "/"; }
function redirectWith(returnTo, key, value) { const target = new URL(returnTo, "https://dotaup.local"); target.searchParams.set(key, value); return Response.redirect(`${target.pathname}${target.search}`, 302); }
function tag(xml, name) { return xml.match(new RegExp(`<${name}>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${name}>`, "i"))?.[1]?.trim() || null; }
function decodeXml(value) { return value?.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'") || null; }
