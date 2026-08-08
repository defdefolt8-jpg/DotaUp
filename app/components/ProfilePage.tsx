"use client";

import { useEffect, useMemo, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ProfileCard } from "./ProfileCard";
import { ProfileTabs } from "./ProfileTabs";
import type { ProfileData, ProfileTab } from "./types";

const mockProfile: ProfileData = {
  nickname: "DemoInvoker",
  id: "601977",
  balance: 0.94,
  withdrawnItems: 0,
  withdrawnAmount: 0,
  upgrades: 481,
};

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("inventory");
  const [sellingEnabled, setSellingEnabled] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [steamProfile, setSteamProfile] = useState<Partial<ProfileData>>({});

  const profile = useMemo(() => ({ ...mockProfile, ...steamProfile }), [steamProfile]);

  useEffect(() => {
    let alive = true;

    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { authenticated?: boolean; user?: { steamId?: string; displayName?: string; avatar?: string | null } | null }) => {
        if (!alive || !payload.authenticated || !payload.user?.steamId) return;
        setSteamProfile({
          nickname: payload.user.displayName || `Steam ${payload.user.steamId.slice(-4)}`,
          id: payload.user.steamId,
          avatarUrl: payload.user.avatar || null,
        });
      })
      .catch(() => undefined);

    return () => {
      alive = false;
    };
  }, []);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(profile.id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleApplyPromo = () => {
    window.alert(
      promoCode.trim() ? `Промокод "${promoCode}" применён.` : "Введите промокод перед применением.",
    );
  };

  const handleTopUp = () => {
    window.alert("Открыть пополнение баланса.");
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white">
      <Header balance={profile.balance} onTopUp={handleTopUp} />

      <main className="mx-auto flex w-full max-w-[1550px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <ProfileCard
          profile={profile}
          copied={copied}
          promoCode={promoCode}
          onCopyId={handleCopyId}
          onPromoCodeChange={setPromoCode}
          onApplyPromo={handleApplyPromo}
          onTopUp={handleTopUp}
        />

        <ProfileTabs
          activeTab={activeTab}
          sellingEnabled={sellingEnabled}
          onTabChange={setActiveTab}
          onToggleSelling={() => setSellingEnabled((value) => !value)}
        />
      </main>

      <Footer />
    </div>
  );
}
