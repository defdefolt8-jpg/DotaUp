"use client";

import { Copy, Settings, BellRing } from "lucide-react";
import type { ProfileData } from "./types";

type UserInfoProps = {
  profile: ProfileData;
  pushEnabled: boolean;
  copied: boolean;
  onCopyId: () => void;
  onTogglePush: () => void;
};

export function UserInfo({
  profile,
  pushEnabled,
  copied,
  onCopyId,
  onTogglePush,
}: UserInfoProps) {
  return (
    <section className="rounded-[20px] border border-white/8 bg-[#171a22] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
      <div className="flex items-start gap-4">
        <div className="flex h-[84px] w-[84px] items-center justify-center rounded-[22px] border border-yellow-400/20 bg-[radial-gradient(circle_at_top,#3f434d_0%,#191c24_72%)] text-2xl font-bold text-yellow-300">
          PN
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Игрок
          </div>
          <h1 className="mt-2 truncate text-[28px] font-semibold leading-none text-white">
            {profile.nickname}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-zinc-200">
              ID {profile.id}
            </div>
            <button
              type="button"
              onClick={onCopyId}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-300 transition hover:border-yellow-400/30 hover:text-white"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Скопировано" : "Копировать"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[18px] border border-white/8 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] text-zinc-300">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold text-white">Push-уведомления</div>
              <div className="text-sm text-zinc-500">Уникальные предложения</div>
            </div>
          </div>

          <button
            type="button"
            aria-pressed={pushEnabled}
            onClick={onTogglePush}
            className={`relative h-8 w-14 rounded-full transition ${
              pushEnabled ? "bg-yellow-400" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                pushEnabled ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-medium text-zinc-200 transition hover:border-yellow-400/25 hover:bg-white/[0.06] hover:text-white"
      >
        <Settings className="h-4 w-4" />
        Настройки аккаунта
      </button>
    </section>
  );
}
