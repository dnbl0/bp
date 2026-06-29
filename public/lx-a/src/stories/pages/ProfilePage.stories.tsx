import type { Meta, StoryObj } from "@storybook/react";
import { ProfilePage } from "../../components/ProfilePage";
import { accounts } from "../../data/accounts";

const meta: Meta<typeof ProfilePage> = {
  title: "Pages/ProfilePage",
  component: ProfilePage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Profile page — Personal Details, Interests, Communication Preferences, Payment Methods + the Encore Membership sidebar with the points sparkline.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {
  render: () => (
    <ProfilePage
      profile={accounts.owner.profile}
      membership={accounts.owner.membership}
    />
  ),
};
