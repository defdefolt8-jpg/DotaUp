import Link from "next/link";
import { Bell, CircleDollarSign, MessageCircleMore, Plus, Send, Shield } from "lucide-react";

type HeaderProps = {
  balance: number;
  onTopUp: () => void;
};

export function Header({ balance, onTopUp }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#242a35] bg-[#0d0e12]/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1550px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="Вернуться к апгрейду"
          className="group flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#8dfc52]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#8dfc52]/30 bg-[#8dfc52]/10 text-[#8dfc52] transition group-hover:border-[#8dfc52]/60 group-hover:bg-[#8dfc52]/15">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8dfc52]">
              DOTA<span className="text-white">UP</span>
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">
              Профиль игрока
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-[#242a35] bg-[#141820] px-3 py-2 text-zinc-300 md:flex">
            <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-[#8dfc52]">
              <Send className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-[#8dfc52]">
              <Bell className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-[#8dfc52]">
              <MessageCircleMore className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-[#242a35] bg-[#141820] px-4 py-2 sm:flex">
            <CircleDollarSign className="h-4 w-4 text-[#8dfc52]" />
            <span className="text-sm text-zinc-500">Баланс</span>
            <strong className="text-base font-semibold text-white">{balance.toFixed(2)}</strong>
          </div>

          <button
            type="button"
            onClick={onTopUp}
            className="inline-flex items-center gap-2 rounded-xl bg-[#8dfc52] px-4 py-3 text-sm font-black text-[#10200c] transition hover:brightness-110 active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" />
            Пополнить
          </button>
        </div>
      </div>
    </header>
  );
}
