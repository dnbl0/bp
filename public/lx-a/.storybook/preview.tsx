import type { Preview, Decorator } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { FlyoutProvider } from "../src/flyout/FlyoutProvider";
import "../src/styles/global.css";
import "../src/styles/dashboard.css";
import "../src/styles/flyout.css";
import "../src/styles/auth.css";
import "./preview.css";

const withFlyoutProvider: Decorator = (Story) => (
  <FlyoutProvider>
    <div className="sb-frame">
      <Story />
    </div>
  </FlyoutProvider>
);

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true }, // theme decorator handles canvas colour
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          [
            "Overview",
            "Colour",
            "Typography",
            "Font weights",
            "Spacing",
            "Radii",
            "Shadows",
            "Opacity",
            "Motion",
            "Tracking",
            "Component tokens",
            "Icons",
          ],
          "Primitives",
          "Composition",
          "Patterns",
          "Flyouts",
          "Concierge",
          "Search",
          "Visualisation",
          "Pages",
          "Authentication",
          "*",
        ],
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // The Lexus dark theme is design-token-driven and intentionally
            // uses subdued borders; lower the severity for non-text contrast
            // so the report stays meaningful for real issues.
            id: "non-text-contrast",
            reviewOnFail: true,
          },
        ],
      },
    },
    docs: {
      toc: { headingSelector: "h2, h3", title: "On this page" },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { Dark: "dark", Light: "light", Auto: "auto" },
      defaultTheme: "Dark",
      attributeName: "data-theme",
    }),
    withFlyoutProvider,
  ],
};

export default preview;
