export type ProfileTab = "inventory" | "items" | "games";

export type ProfileData = {
  nickname: string;
  id: string;
  avatarUrl?: string | null;
  balance: number;
  withdrawnItems: number;
  withdrawnAmount: number;
  upgrades: number;
};

export type SiteItem = {
  id: number;
  weapon: string;
  skin: string;
  wear: string;
  price: number;
  color: string;
  image?: string | null;
  imageLabel?: string;
};

export type ItemHistoryEntry = {
  id: string;
  itemId: number;
  price: number;
  status: string;
  at: string;
};

export type GameHistoryEntry = {
  id: string;
  targetSkin: string;
  chance: number;
  stake: number;
  roll: number;
  result: string;
  at: string;
};
