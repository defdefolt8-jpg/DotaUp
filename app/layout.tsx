import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DotaUp — Skin Upgrade Arena",
  description: "Интерактивная демонстрационная платформа апгрейда игровых предметов.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
