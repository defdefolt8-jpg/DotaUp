import { BalanceCard } from "./BalanceCard";
import { StatsCard } from "./StatsCard";
import { UserInfo } from "./UserInfo";
import type { ProfileData } from "./types";

type ProfileCardProps = {
  profile: ProfileData;
  copied: boolean;
  promoCode: string;
  onCopyId: () => void;
  onPromoCodeChange: (value: string) => void;
  onApplyPromo: () => void;
  onTopUp: () => void;
  onLogout: () => void;
};

export function ProfileCard(props: ProfileCardProps) {
  const {
    profile,
    copied,
    promoCode,
    onCopyId,
    onPromoCodeChange,
    onApplyPromo,
    onTopUp,
    onLogout,
  } = props;

  return (
    <section className="rounded-[22px] border border-[#242a35] bg-[#101319] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-4 lg:p-5">
      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.96fr_0.78fr]">
        <UserInfo profile={profile} copied={copied} onCopyId={onCopyId} onLogout={onLogout} />
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
