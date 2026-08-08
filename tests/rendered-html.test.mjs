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

test("server-renders the profile page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Arena Hub/i);
  assert.match(html, /PlayerName/);
  assert.match(html, /Баланс/);
  assert.match(html, /Инвентарь/);
  assert.match(html, /У вас пока нет предметов/);
});

test("uses component-based profile implementation", async () => {
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
  assert.match(page, /ProfilePage/);
  assert.match(profilePage, /ProfileCard/);
  assert.match(profilePage, /ProfileTabs/);
  assert.match(profileCard, /UserInfo/);
  assert.match(profileCard, /BalanceCard/);
  assert.match(profileCard, /StatsCard/);
  assert.match(header, /Пополнить/);
  assert.match(footer, /Поддержка/);
  assert.match(layout, /Arena Hub/);
});
