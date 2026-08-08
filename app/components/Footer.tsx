import { MessageCircleMore, Send } from "lucide-react";

const footerColumns = [
  {
    title: "Поддержка",
    links: ["support@dotaup.demo", "Центр помощи"],
  },
  {
    title: "Сотрудничество",
    links: ["partners@dotaup.demo", "Рекламные размещения"],
  },
  {
    title: "Документы",
    links: ["Пользовательское соглашение", "Cookie Policy", "Privacy Policy"],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#242a35] bg-[#0b0c10]">
      <div className="mx-auto grid w-full max-w-[1550px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] lg:px-10">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-zinc-200">{column.title}</h3>
            <div className="mt-4 space-y-3">
              {column.links.map((link) => (
                <button
                  key={link}
                  type="button"
                  className="block text-left text-sm text-zinc-500 transition hover:text-[#8dfc52]"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-start gap-3">
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#313744] bg-[#141820] text-zinc-500 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52]">
            <Send className="h-4 w-4" />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#313744] bg-[#141820] text-zinc-500 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52]">
            <MessageCircleMore className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
