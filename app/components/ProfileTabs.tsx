"use client";

import { ArrowUpCircle, Boxes, History } from "lucide-react";
import { InventoryEmptyState } from "./InventoryEmptyState";
import type { GameHistoryEntry, ItemHistoryEntry, ProfileTab, SiteItem } from "./types";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  sellingEnabled: boolean;
  inventory: SiteItem[];
  itemHistory: ItemHistoryEntry[];
  gameHistory: GameHistoryEntry[];
  onTabChange: (tab: ProfileTab) => void;
  onToggleSelling: () => void;
  onSellAll: () => void;
  onSellItem: (itemId: number) => void;
  onWithdrawItem: (itemId: number) => void;
};

const tabs = [
  { id: "inventory", label: "Инвентарь", icon: Boxes },
  { id: "items", label: "История предметов", icon: History },
  { id: "games", label: "История игр", icon: ArrowUpCircle },
] as const;

const money = (value: number) => `${Math.round(value).toLocaleString("ru-RU")} COIN`;

function ItemImage({ item }: { item: SiteItem }) {
  return (
    <div
      className="mt-3 flex h-28 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-[radial-gradient(circle_at_top,rgba(141,252,82,0.12),rgba(255,255,255,0.03)_70%)]"
      style={{ boxShadow: `inset 0 0 28px ${item.color}22` }}
    >
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt="" className="h-full w-full object-contain p-2" />
      ) : (
        <span className="text-lg font-black text-zinc-500">{item.imageLabel || item.skin.slice(0, 2)}</span>
      )}
    </div>
  );
}

export function ProfileTabs({
  activeTab,
  sellingEnabled,
  inventory,
  itemHistory,
  gameHistory,
  onTabChange,
  onToggleSelling,
  onSellAll,
  onSellItem,
  onWithdrawItem,
}: ProfileTabsProps) {
  return (
    <section className="rounded-[22px] border border-[#242a35] bg-[#101319] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-3">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={`inline-flex h-13 items-center gap-2 rounded-xl border px-5 text-sm font-black transition ${
                  isActive
                    ? "border-[#8dfc52] bg-[#8dfc52] text-[#10200c]"
                    : "border-[#313744] bg-[#141820] text-zinc-300 hover:border-[#8dfc52]/40 hover:text-[#8dfc52]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onToggleSelling}
            className="flex items-center justify-between gap-4 rounded-xl border border-[#313744] bg-[#141820] px-4 py-3 text-sm text-zinc-300 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52] sm:min-w-[260px]"
          >
            <span>Доступно для продажи: {inventory.length}</span>
            <span className={`relative block h-7 w-12 rounded-full transition ${sellingEnabled ? "bg-[#8dfc52]" : "bg-white/10"}`}>
              <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${sellingEnabled ? "left-6" : "left-1"}`} />
            </span>
          </button>

          <button
            type="button"
            onClick={onSellAll}
            className="h-13 rounded-xl border border-[#313744] bg-[#141820] px-6 text-sm font-black text-zinc-200 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52]"
          >
            Продать все
          </button>
        </div>
      </div>

      <div className="mt-5">
        {activeTab === "inventory" && (
          inventory.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {inventory.map((item) => (
                <article key={item.id} className="rounded-2xl border border-[#313744] bg-[#141820] p-3 transition hover:-translate-y-0.5 hover:border-[#8dfc52]/40">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-[#8dfc52]">{money(item.price)}</span>
                    <span className="text-zinc-500">{item.wear}</span>
                  </div>
                  <ItemImage item={item} />
                  <strong className="mt-3 block truncate text-sm text-white">{item.skin}</strong>
                  <span className="mt-1 block truncate text-xs text-zinc-500">{item.weapon}</span>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => onSellItem(item.id)} className="h-9 rounded-lg border border-[#313744] bg-[#101319] text-xs font-black text-zinc-200 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52]">
                      Продать
                    </button>
                    <button type="button" onClick={() => onWithdrawItem(item.id)} className="h-9 rounded-lg bg-[#8dfc52] text-xs font-black text-[#10200c] transition hover:brightness-110">
                      В Steam
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <InventoryEmptyState />
          )
        )}

        {activeTab === "items" && (
          itemHistory.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {itemHistory.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-[#313744] bg-white/[0.02] p-4">
                  <div className="text-sm font-black text-[#8dfc52]">{entry.status}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{money(entry.price)}</div>
                  <div className="mt-2 text-xs text-zinc-500">{entry.at}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#313744] bg-white/[0.02] p-6 text-zinc-400">История предметов пока пустая.</div>
          )
        )}

        {activeTab === "games" && (
          gameHistory.length ? (
            <div className="space-y-3">
              {gameHistory.map((game) => (
                <div key={game.id} className="grid gap-3 rounded-2xl border border-[#313744] bg-white/[0.02] p-4 text-sm sm:grid-cols-5">
                  <strong className={game.result.includes("Выиг") ? "text-[#8dfc52]" : "text-red-300"}>{game.result}</strong>
                  <span className="text-zinc-300">{game.targetSkin}</span>
                  <span className="text-zinc-400">Шанс {Number(game.chance).toFixed(2)}%</span>
                  <span className="text-zinc-400">Ставка {money(game.stake)}</span>
                  <span className="text-zinc-500">{game.at}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#313744] bg-white/[0.02] p-6 text-zinc-400">История игр появится после первых апгрейдов.</div>
          )
        )}
      </div>
    </section>
  );
}
