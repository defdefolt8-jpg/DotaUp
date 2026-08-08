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
      <div className="mx-auto grid w-full max-w-[1550px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-10">
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
      </div>
    </footer>
  );
}
