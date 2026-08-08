"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type AuthState = "checking" | "success" | "error";

export default function SteamCompletePage() {
  const [state, setState] = useState<AuthState>("checking");
  const [message, setMessage] = useState("Проверяем вход через Steam...");

  const errorFromUrl = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("auth_error");
  }, []);

  useEffect(() => {
    let alive = true;

    async function verifySession() {
      if (errorFromUrl) {
        setState("error");
        setMessage(`Steam не подтвердил вход: ${errorFromUrl}`);
        return;
      }

      for (let attempt = 0; attempt < 8; attempt += 1) {
        try {
          const response = await fetch("/api/auth/me", {
            credentials: "include",
            cache: "no-store",
          });
          const payload = await response.json();

          if (!alive) return;

          if (payload.authenticated) {
            setState("success");
            setMessage("Steam подключен. Возвращаемся в апгрейдер...");
            window.setTimeout(() => {
              window.location.href = "/";
            }, 650);
            return;
          }
        } catch {
          // retry below
        }

        await new Promise((resolve) => window.setTimeout(resolve, 450));
      }

      if (!alive) return;
      setState("error");
      setMessage("Steam вернул страницу, но сессия не создалась. Попробуй открыть сайт в обычном браузере и войти ещё раз.");
    }

    verifySession();

    return () => {
      alive = false;
    };
  }, [errorFromUrl]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0e12] px-5 text-white">
      <section className="w-full max-w-md rounded-[28px] border border-[#242a35] bg-[#101319] p-7 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl text-2xl font-black ${
          state === "success" ? "bg-[#8dfc52] text-[#10200c]" : state === "error" ? "bg-red-500/15 text-red-200" : "bg-[#8dfc52]/10 text-[#8dfc52]"
        }`}>
          {state === "success" ? "✓" : state === "error" ? "!" : "S"}
        </div>

        <h1 className="mt-5 text-2xl font-black">Steam авторизация</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{message}</p>

        {state === "checking" && (
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#8dfc52]" />
          </div>
        )}

        {state === "error" && (
          <div className="mt-6 grid gap-3">
            <Link href="/" className="rounded-xl bg-[#8dfc52] px-5 py-3 text-sm font-black text-[#10200c] transition hover:brightness-110">
              Вернуться на сайт
            </Link>
            <Link href="/api/auth/steam/login?return_to=%2Fauth%2Fsteam%2Fcomplete" className="rounded-xl border border-[#313744] bg-[#141820] px-5 py-3 text-sm font-black text-zinc-200 transition hover:border-[#8dfc52]/40 hover:text-[#8dfc52]">
              Попробовать ещё раз
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
