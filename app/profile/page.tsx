import type { Metadata } from "next";
import { ProfilePage } from "../components/ProfilePage";

export const metadata: Metadata = {
  title: "DotaUp - Профиль",
  other: {
    "theme-color": "#080b0d",
  },
};

export default function Profile() {
  return <ProfilePage />;
}
