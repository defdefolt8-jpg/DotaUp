import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arena Hub — Player Profile",
  description: "Игровая профильная страница в тёмной стилистике marketplace интерфейса.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
