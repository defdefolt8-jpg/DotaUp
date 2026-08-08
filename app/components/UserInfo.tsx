"use client";

import { Copy, Settings } from "lucide-react";
import type { ProfileData } from "./types";

type UserInfoProps = {
  profile: ProfileData;
  copied: boolean;
  onCopyId: () => void;
};

export function UserInfo({ profile, copied, onCopyId }: UserInfoProps) {
  const initials = profile.nickname
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "ST";

  return (
    <section className="rounded-2xl border border-[#2c3240] bg-[#171b22] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
      <div className="flex items-start gap-4">
        <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#8dfc52]/30 bg-[radial-gradient(circle_at_top,#27342b_0%,#151922_72%)] text-2xl font-black text-[#8dfc52]">
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8dfc52]">
            Игрок
          </div>
          <h1 className="mt-2 truncate text-[28px] font-semibold leading-none text-white">
            {profile.nickname}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="rounded-lg border border-[#313744] bg-[#11151d] px-3 py-2 text-sm font-semibold text-zinc-200">
              ID {profile.id}
            </div>
            <button
              type="button"
              onClick={onCopyId}
              className="inline-flex items-center gap-2 rounded-lg border border-[#313744] bg-[#11151d] px-3 py-2 text-sm text-zinc-300 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52]"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Скопировано" : "Копировать"}
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#313744] bg-[#11151d] px-4 py-4 text-base font-semibold text-zinc-200 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52]"
      >
        <Settings className="h-4 w-4" />
        Настройки аккаунта
      </button>
    </section>
  );
}
