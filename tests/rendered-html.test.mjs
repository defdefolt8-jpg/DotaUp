import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the main site frame", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /site\/index\.html/);
  assert.match(html, /site-frame/);
});

test("keeps profile route component-based and branded", async () => {
  const [page, layout, packageJson, profilePage, profileCard, header, footer] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ProfilePage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ProfileCard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/Header.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/Footer.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"lucide-react"/);
  assert.match(page, /site\/index\.html/);
  assert.match(profilePage, /ProfileCard/);
  assert.match(profilePage, /ProfileTabs/);
  assert.match(profileCard, /UserInfo/);
  assert.match(profileCard, /BalanceCard/);
  assert.match(profileCard, /StatsCard/);
  assert.match(header, /DOTA/);
  assert.match(header, /href="\/"/);
  assert.match(footer, /Поддержка/);
  assert.match(layout, /DotaUp/);
});

test("uses real Steam OpenID routes instead of demo-only auth", async () => {
  const [worker, script, index] = await Promise.all([
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/site/script.js", import.meta.url), "utf8"),
    readFile(new URL("../public/site/index.html", import.meta.url), "utf8"),
  ]);

  assert.match(worker, /\/api\/auth\/steam\/login/);
  assert.match(worker, /\/api\/auth\/steam\/callback/);
  assert.match(worker, /check_authentication/);
  assert.match(worker, /dotaup_steam_session/);
  assert.match(worker, /avatar_url/);
  assert.match(worker, /steamcommunity\.com\/profiles/);
  assert.match(script, /\/api\/auth\/me/);
  assert.match(script, /syncSteamAvatars/);
  assert.match(script, /\/api\/auth\/steam\/login\?return_to=\//);
  assert.doesNotMatch(script, /dotaupSteamLoggedIn/);
  assert.match(index, /id="steamLoginButton"/);
  assert.doesNotMatch(index, /class="steam-button" type="button" data-modal-open/);
});
