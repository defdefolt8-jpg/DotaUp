import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DotaUp — Профиль",
  description: "Профиль игрока DotaUp в тёмной стилистике skin upgrade интерфейса.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
