"use client";

import { Boxes, History, ArrowUpCircle } from "lucide-react";
import { InventoryEmptyState } from "./InventoryEmptyState";
import type { ProfileTab } from "./types";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  sellingEnabled: boolean;
  onTabChange: (tab: ProfileTab) => void;
  onToggleSelling: () => void;
};

const tabs = [
  { id: "inventory", label: "Инвентарь", icon: Boxes },
  { id: "items", label: "История предметов", icon: History },
  { id: "games", label: "История игр", icon: ArrowUpCircle },
] as const;

export function ProfileTabs({
  activeTab,
  sellingEnabled,
  onTabChange,
  onToggleSelling,
}: ProfileTabsProps) {
  return (
    <section className="rounded-[24px] border border-white/7 bg-[#101319] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-3">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={`inline-flex h-13 items-center gap-2 rounded-[16px] border px-5 text-sm font-semibold transition ${
                  isActive
                    ? "border-yellow-300 bg-yellow-400 text-[#161101]"
                    : "border-white/8 bg-white/[0.03] text-zinc-300 hover:border-yellow-400/25 hover:text-white"
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
            className="flex items-center justify-between gap-4 rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300 transition hover:border-yellow-400/20 hover:text-white sm:min-w-[260px]"
          >
            <span>Доступно для продажи</span>
            <span
              className={`relative block h-7 w-12 rounded-full transition ${
                sellingEnabled ? "bg-yellow-400" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  sellingEnabled ? "left-6" : "left-1"
                }`}
              />
            </span>
          </button>

          <button
            type="button"
            className="h-13 rounded-[16px] border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-zinc-200 transition hover:border-yellow-400/25 hover:text-white"
          >
            Продать все
          </button>
        </div>
      </div>

      <div className="mt-5">
        {activeTab === "inventory" && <InventoryEmptyState />}

        {activeTab === "items" && (
          <div className="rounded-[22px] border border-white/8 bg-white/[0.02] p-6 text-zinc-400">
            История предметов пока пуста.
          </div>
        )}

        {activeTab === "games" && (
          <div className="rounded-[22px] border border-white/8 bg-white/[0.02] p-6 text-zinc-400">
            История игр появится после первых апгрейдов.
          </div>
        )}
      </div>
    </section>
  );
}
