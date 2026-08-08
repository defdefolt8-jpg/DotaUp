import { BalanceCard } from "./BalanceCard";
import { StatsCard } from "./StatsCard";
import { UserInfo } from "./UserInfo";
import type { ProfileData } from "./types";

type ProfileCardProps = {
  profile: ProfileData;
  pushEnabled: boolean;
  copied: boolean;
  promoCode: string;
  onCopyId: () => void;
  onTogglePush: () => void;
  onPromoCodeChange: (value: string) => void;
  onApplyPromo: () => void;
  onTopUp: () => void;
};

export function ProfileCard(props: ProfileCardProps) {
  const {
    profile,
    pushEnabled,
    copied,
    promoCode,
    onCopyId,
    onTogglePush,
    onPromoCodeChange,
    onApplyPromo,
    onTopUp,
  } = props;

  return (
    <section className="rounded-[28px] border border-white/7 bg-[#101319] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-4 lg:p-5">
      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.96fr_0.78fr]">
        <UserInfo
          profile={profile}
          pushEnabled={pushEnabled}
          copied={copied}
          onCopyId={onCopyId}
          onTogglePush={onTogglePush}
        />
        <BalanceCard
          balance={profile.balance}
          promoCode={promoCode}
          onPromoCodeChange={onPromoCodeChange}
          onApplyPromo={onApplyPromo}
          onTopUp={onTopUp}
        />
        <StatsCard
          withdrawnItems={profile.withdrawnItems}
          withdrawnAmount={profile.withdrawnAmount}
          upgrades={profile.upgrades}
        />
      </div>
    </section>
  );
}
