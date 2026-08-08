export type ProfileTab = "inventory" | "items" | "games";

export type ProfileData = {
  nickname: string;
  id: string;
  balance: number;
  withdrawnItems: number;
  withdrawnAmount: number;
  upgrades: number;
};
