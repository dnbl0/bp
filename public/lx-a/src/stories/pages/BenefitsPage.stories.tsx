import type { Meta, StoryObj } from "@storybook/react";
import { BenefitsPage } from "../../components/BenefitsPage";
import { accounts } from "../../data/accounts";

const meta: Meta<typeof BenefitsPage> = {
  title: "Pages/BenefitsPage (Encore)",
  component: BenefitsPage,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof BenefitsPage>;

export const Owner: Story = {
  render: () => (
    <BenefitsPage
      onBack={() => {}}
      onOpenBenefit={() => {}}
      benefits={accounts.owner.encoreBenefits}
      memberProgram={accounts.owner.member.program}
      memberTier={accounts.owner.member.tier}
      canRedeemEncore={accounts.owner.canRedeemEncore}
      theme={accounts.owner.theme}
    />
  ),
};

export const LimitedAccount: Story = {
  render: () => (
    <BenefitsPage
      onBack={() => {}}
      onOpenBenefit={() => {}}
      benefits={accounts.guest.encoreBenefits}
      memberProgram={accounts.guest.member.program}
      memberTier={accounts.guest.member.tier}
      canRedeemEncore={accounts.guest.canRedeemEncore}
      restrictionsCopy={accounts.guest.restrictionsCopy}
      theme={accounts.guest.theme}
    />
  ),
};
