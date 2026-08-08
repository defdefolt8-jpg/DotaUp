import { Inbox } from "lucide-react";

export function InventoryEmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#313744] bg-white/[0.02] px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8dfc52]/10 text-[#8dfc52]">
        <Inbox className="h-7 w-7" />
      </div>
      <p className="mt-5 text-lg font-medium text-zinc-300">У вас пока нет предметов</p>
    </div>
  );
}
