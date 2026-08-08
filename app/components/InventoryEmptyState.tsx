import { Inbox } from "lucide-react";

export function InventoryEmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[22px] border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.04] text-zinc-400">
        <Inbox className="h-7 w-7" />
      </div>
      <p className="mt-5 text-lg font-medium text-zinc-300">У вас пока нет предметов</p>
    </div>
  );
}
