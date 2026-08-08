"use client";

import { useMemo, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ProfileCard } from "./ProfileCard";
import { ProfileTabs } from "./ProfileTabs";
import type { ProfileData, ProfileTab } from "./types";

const mockProfile: ProfileData = {
  nickname: "PlayerName",
  id: "601977",
  balance: 0.94,
  withdrawnItems: 0,
  withdrawnAmount: 0,
  upgrades: 481,
};

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("inventory");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [sellingEnabled, setSellingEnabled] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [copied, setCopied] = useState(false);

  const profile = useMemo(() => mockProfile, []);

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
    window.alert("Открыть сценарий пополнения баланса.");
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <Header balance={profile.balance} onTopUp={handleTopUp} />

      <main className="mx-auto flex w-full max-w-[1680px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <ProfileCard
          profile={profile}
          pushEnabled={pushEnabled}
          copied={copied}
          promoCode={promoCode}
          onCopyId={handleCopyId}
          onTogglePush={() => setPushEnabled((value) => !value)}
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
