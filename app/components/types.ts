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
