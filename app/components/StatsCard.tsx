import { ArrowUpToLine, Coins, Package2 } from "lucide-react";

type StatsCardProps = {
  withdrawnItems: number;
  withdrawnAmount: number;
  upgrades: number;
};

export function StatsCard({ withdrawnItems, withdrawnAmount, upgrades }: StatsCardProps) {
  return (
    <div className="grid h-full grid-rows-[minmax(0,1fr)_auto] gap-4">
      <section className="rounded-2xl border border-[#2c3240] bg-[#171b22] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[15px] font-semibold text-white">Выведено</div>
            <div className="mt-5 text-base text-zinc-500">{withdrawnItems} предметов</div>
            <div className="mt-3 text-[34px] font-semibold leading-none text-[#8dfc52]">
              {withdrawnAmount.toFixed(2)}
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8dfc52]/10 text-[#8dfc52]">
            <Coins className="h-5 w-5" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#2c3240] bg-[#171b22] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[15px] font-semibold text-white">Апгрейдов</div>
            <div className="mt-5 text-[34px] font-semibold leading-none text-[#8dfc52]">
              {upgrades}
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8dfc52]/10 text-[#8dfc52]">
            <ArrowUpToLine className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
          <Package2 className="h-4 w-4" />
          Активность профиля
        </div>
      </section>
    </div>
  );
}
