import type { Metadata } from "next";
import { ProfilePage } from "./components/ProfilePage";

export const metadata: Metadata = {
  other: {
    "theme-color": "#0b0d12",
  },
};

export default function Home() {
  return <ProfilePage />;
}
