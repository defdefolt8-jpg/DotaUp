import type { Metadata } from "next";
import { ProfilePage } from "../components/ProfilePage";

export const metadata: Metadata = {
  title: "DotaUp - Профиль",
  other: {
    "theme-color": "#0b0d12",
  },
};

export default function Profile() {
  return <ProfilePage />;
}
