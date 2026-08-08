import { Bell, CircleDollarSign, MessageCircleMore, Plus, Send, Shield } from "lucide-react";

type HeaderProps = {
  balance: number;
  onTopUp: () => void;
};

export function Header({ balance, onTopUp }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/6 bg-[#090b10]/92 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-yellow-300">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
              Arena Hub
            </div>
            <div className="text-lg font-semibold text-white">Player Profile</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-2 text-zinc-300 md:flex">
            <button className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/6 hover:text-white">
              <Send className="h-4 w-4" />
            </button>
            <button className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/6 hover:text-white">
              <Bell className="h-4 w-4" />
            </button>
            <button className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/6 hover:text-white">
              <MessageCircleMore className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-yellow-400/15 bg-[#11141b] px-4 py-2 sm:flex">
            <CircleDollarSign className="h-4 w-4 text-yellow-300" />
            <span className="text-sm text-zinc-400">Баланс</span>
            <strong className="text-base font-semibold text-white">{balance.toFixed(2)}</strong>
          </div>

          <button
            type="button"
            onClick={onTopUp}
            className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-semibold text-[#161101] transition hover:brightness-105 active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" />
            Пополнить
          </button>
        </div>
      </div>
    </header>
  );
}
