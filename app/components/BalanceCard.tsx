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
    <section className="flex h-full flex-col justify-between rounded-[20px] border border-white/8 bg-[#171a22] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div className="text-[14px] font-medium text-zinc-300">Баланс</div>
          <Coins className="h-5 w-5 text-zinc-500" />
        </div>

        <div className="mt-7 flex items-end gap-3">
          <div className="text-[62px] font-semibold leading-none tracking-[-0.05em] text-white">
            {balance.toFixed(2)}
          </div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400/15 text-yellow-300">
            <Gift className="h-4 w-4" />
          </div>
        </div>

        <button
          type="button"
          className="mt-4 text-left text-base text-zinc-500 transition hover:text-zinc-300"
        >
          История платежей
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex flex-col gap-3 rounded-[18px] border border-white/8 bg-white/[0.03] p-3 sm:flex-row">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[14px] bg-yellow-400 px-4 text-[#201700]">
            <TicketPercent className="h-5 w-5 shrink-0" />
            <input
              value={promoCode}
              onChange={(event) => onPromoCodeChange(event.target.value)}
              placeholder="Введите купон"
              className="h-12 w-full bg-transparent text-sm font-medium outline-none placeholder:text-[#6f5914]"
            />
          </div>

          <button
            type="button"
            onClick={onApplyPromo}
            className="h-12 rounded-[14px] border border-white/8 bg-white/[0.05] px-5 text-sm font-semibold text-zinc-200 transition hover:border-yellow-400/20 hover:text-white"
          >
            Применить
          </button>
        </div>

        <button
          type="button"
          onClick={onTopUp}
          className="inline-flex h-14 w-full items-center justify-center rounded-[18px] bg-yellow-400 text-base font-semibold text-[#191300] transition hover:brightness-105 active:scale-[0.99]"
        >
          Пополнить баланс
        </button>
      </div>
    </section>
  );
}
