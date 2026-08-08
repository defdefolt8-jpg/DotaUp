"use client";

import { Coins, Gift, TicketPercent } from "lucide-react";

type BalanceCardProps = {
  balance: number;
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  onApplyPromo: () => void;
  onTopUp: () => void;
};

export function BalanceCard({
  balance,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  onTopUp,
}: BalanceCardProps) {
  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-[#2c3240] bg-[#171b22] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-zinc-300">Баланс</div>
          <Coins className="h-5 w-5 text-[#8dfc52]" />
        </div>

        <div className="mt-7 flex items-end gap-3">
          <div className="text-[62px] font-semibold leading-none text-white">
            {Math.round(balance).toLocaleString("ru-RU")}
          </div>
          <div className="mb-3 text-sm font-black tracking-[0.18em] text-[#8dfc52]">COIN</div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#8dfc52]/10 text-[#8dfc52]">
            <Gift className="h-4 w-4" />
          </div>
        </div>

        <button
          type="button"
          className="mt-4 text-left text-base text-zinc-500 transition hover:text-[#8dfc52]"
        >
          История платежей
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex flex-col gap-3 rounded-xl border border-[#252b37] bg-white/[0.03] p-3 sm:flex-row">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-[#11151d] px-4 text-zinc-200 ring-1 ring-[#313744] focus-within:ring-[#8dfc52]/40">
            <TicketPercent className="h-5 w-5 shrink-0 text-[#8dfc52]" />
            <input
              value={promoCode}
              onChange={(event) => onPromoCodeChange(event.target.value)}
              placeholder="Введите купон"
              className="h-12 w-full bg-transparent text-sm font-medium outline-none placeholder:text-zinc-600"
            />
          </div>

          <button
            type="button"
            onClick={onApplyPromo}
            className="h-12 rounded-lg border border-[#313744] bg-[#1b2029] px-5 text-sm font-semibold text-zinc-200 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52]"
          >
            Применить
          </button>
        </div>

        <button
          type="button"
          onClick={onTopUp}
          className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-[#8dfc52] text-base font-black text-[#10200c] transition hover:brightness-110 active:scale-[0.99]"
        >
          Пополнить баланс
        </button>
      </div>
    </section>
  );
}
