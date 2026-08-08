import { Send, MessageCircleMore } from "lucide-react";

const footerColumns = [
  {
    title: "Поддержка",
    links: ["support@arena-hub.gg", "Центр помощи"],
  },
  {
    title: "Сотрудничество",
    links: ["partners@arena-hub.gg", "Рекламные размещения"],
  },
  {
    title: "Документы",
    links: ["Пользовательское соглашение", "Cookie Policy", "Privacy Policy"],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#090b10]">
      <div className="mx-auto grid w-full max-w-[1680px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] lg:px-10">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-zinc-200">{column.title}</h3>
            <div className="mt-4 space-y-3">
              {column.links.map((link) => (
                <button
                  key={link}
                  type="button"
                  className="block text-left text-sm text-zinc-500 transition hover:text-zinc-300"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-start gap-3">
          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-zinc-400 transition hover:border-yellow-400/20 hover:text-white">
            <Send className="h-4 w-4" />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-zinc-400 transition hover:border-yellow-400/20 hover:text-white">
            <MessageCircleMore className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
