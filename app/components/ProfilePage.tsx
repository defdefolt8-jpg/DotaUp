"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ProfileCard } from "./ProfileCard";
import { ProfileTabs } from "./ProfileTabs";
import type { GameHistoryEntry, ItemHistoryEntry, ProfileData, ProfileTab, SiteItem } from "./types";

const profileStateKey = "dotaupProfileState";

type SavedProfileState = {
  balance?: number;
  ownedIds?: number[];
  ownedItems?: SiteItem[];
  itemHistory?: ItemHistoryEntry[];
  gameHistory?: GameHistoryEntry[];
  user?: {
    name?: string;
    steamId?: string;
    avatar?: string | null;
  };
};

const defaultProfile: ProfileData = {
  nickname: "Steam user",
  id: "601977",
  avatarUrl: null,
  balance: 50000,
  withdrawnItems: 0,
  withdrawnAmount: 0,
  upgrades: 0,
};

function readSavedState(): SavedProfileState {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(window.localStorage.getItem(profileStateKey) || "{}") as SavedProfileState;
  } catch {
    return {};
  }
}

function writeSavedState(next: SavedProfileState) {
  window.localStorage.setItem(profileStateKey, JSON.stringify({ ...next, updatedAt: new Date().toISOString() }));
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("inventory");
  const [sellingEnabled, setSellingEnabled] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [savedState, setSavedState] = useState<SavedProfileState>({});
  const [steamProfile, setSteamProfile] = useState<Partial<ProfileData>>({});

  const inventory = savedState.ownedItems ?? [];
  const itemHistory = savedState.itemHistory ?? [];
  const gameHistory = savedState.gameHistory ?? [];

  const profile = useMemo<ProfileData>(() => {
    const steamId = steamProfile.id || savedState.user?.steamId?.replace(/^ID\s+/i, "") || defaultProfile.id;

    return {
      ...defaultProfile,
      balance: Number.isFinite(Number(savedState.balance)) ? Number(savedState.balance) : defaultProfile.balance,
      upgrades: gameHistory.length,
      nickname: steamProfile.nickname || savedState.user?.name || defaultProfile.nickname,
      id: steamId,
      avatarUrl: steamProfile.avatarUrl ?? savedState.user?.avatar ?? null,
    };
  }, [gameHistory.length, savedState, steamProfile]);

  const refreshSavedState = useCallback(() => {
    setSavedState(readSavedState());
  }, []);

  const persistSavedState = useCallback((next: SavedProfileState) => {
    writeSavedState(next);
    setSavedState(next);
  }, []);

  useEffect(() => {
    refreshSavedState();

    const onFocus = () => refreshSavedState();
    const onStorage = (event: StorageEvent) => {
      if (event.key === profileStateKey) refreshSavedState();
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, [refreshSavedState]);

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
    window.alert(promoCode.trim() ? `Промокод "${promoCode}" применён.` : "Введите промокод перед применением.");
  };

  const handleTopUp = () => {
    window.alert("Пополнение баланса подключим следующим шагом.");
  };

  const handleLogout = () => {
    window.location.href = "/api/auth/logout?return_to=/";
  };

  const handleSellItem = (itemId: number) => {
    const item = inventory.find((entry) => entry.id === itemId);
    if (!item) return;

    persistSavedState({
      ...savedState,
      balance: profile.balance + item.price,
      ownedItems: inventory.filter((entry) => entry.id !== itemId),
      ownedIds: inventory.filter((entry) => entry.id !== itemId).map((entry) => entry.id),
    });
  };

  const handleSellAll = () => {
    if (!inventory.length) return;
    const total = inventory.reduce((sum, item) => sum + item.price, 0);
    persistSavedState({
      ...savedState,
      balance: profile.balance + total,
      ownedItems: [],
      ownedIds: [],
    });
  };

  const handleWithdrawItem = (itemId: number) => {
    const item = inventory.find((entry) => entry.id === itemId);
    if (!item) return;
    const tradeUrl = window.prompt(`Вставь Steam trade-ссылку для вывода "${item.skin}"`);
    if (!tradeUrl) return;
    window.alert("Заявка на вывод создана. Реальный трейд-бот подключим на backend отдельно.");
  };

  return (
    <div className="profile-page-red min-h-screen overflow-x-hidden text-white">
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
          onLogout={handleLogout}
        />

        <ProfileTabs
          activeTab={activeTab}
          sellingEnabled={sellingEnabled}
          inventory={inventory}
          itemHistory={itemHistory}
          gameHistory={gameHistory}
          onTabChange={setActiveTab}
          onToggleSelling={() => setSellingEnabled((value) => !value)}
          onSellAll={handleSellAll}
          onSellItem={handleSellItem}
          onWithdrawItem={handleWithdrawItem}
        />
      </main>

      <Footer />
    </div>
  );
}
