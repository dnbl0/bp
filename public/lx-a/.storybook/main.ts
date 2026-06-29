import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@chromatic-com/storybook",
  ],
  docs: {
    autodocs: "tag",
    defaultName: "Docs",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  staticDirs: ["../public"],
};

export default config;
