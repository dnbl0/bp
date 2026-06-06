![Bupa Aged Care Website](/docs/bvac-home-page.png)

# Bupa Aged Care Website

This repository contains the Bupa Aged Care website.

## Project Resources
- [Confluence](https://iegroup.atlassian.net/wiki/spaces/BO/overview)
- [Jira](https://iegroup.atlassian.net/jira/software/projects/BVAC/boards/620/backlog)
- [Contentful Bupa Aged Care Space](https://app.contentful.com/spaces/7jbjw06z88y9/home)
- [Netlfiy Bupa Project](https://app.netlify.com/sites/aged-care/overview)
- [Figma Project with design reference and UI Kit](https://www.figma.com/file/iYWhlWxkIXlSYfdZUm8Zra/BVAC-UI-Kit?t=KnMfVVyMC960RO2F-0)
- [Solution Design Document](https://docs.google.com/document/d/1mHIUj82DG32-QFj66R9JEFB8keNGGE9nNBg_UlHvoHc/edit#)
- Secrets, API keys etc stored in TeamPass.

## Environments
- [Production](https://www.bupaagedcare.org/)
- [UAT](https://uat.bupaagedcare.org/)
- [Dev/QA](https://main.bupaagedcare.org/)

## Tech Stack
- [Netlify](https://www.netlify.com/) for hosting.
- [Next.js](https://nextjs.org/) fullstack React framework.
- [Contentful](https://www.contentful.com/) as a headless CMS.
- [Vitest](https://vitest.dev) for unit testing with global setup script for loading environment variables.
- [TypeScript](https://typescriptlang.org)
- [Yarn](https://yarnpkg.com/)
- [Tailwind](https://tailwindcss.com/) for writing CSS
- [Prettier](https://prettier.io) for automatic code formatting.
  - [Prettier VS Code Extension](https://github.com/prettier/prettier-vscode) for format-on-save.

## Development

First, run the development server:

1. Copy `.env-example` and rename to `.env`. Update the environment variables
with required access tokens.
2. Install dependencies: `yarn`
3. Run the development server: `yarn dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Recommended settings.json file

Create a local `settings.json` file in `.vscode` directory and add following rules. It will remove any styles warnings or errors that you will see while starting fresh with the project.

```
{
     "files.associations": {
        "*.css": "tailwindcss"
    },
    "css.lint.emptyRules": "ignore",
    "tailwindCSS.validate": true,
    "css.validate": false,
}
```

## Deployment
- Changes on the `main`, `uat` and `prod` branches are automatically deployed by Netlify.
- The `prod` branch is linked to the production environment.
- The `uat` branch is linked to the UAT environment.
- The `main` branch is linked to the `QA` / `DEV` environment.


## Third Party Tools
- [SVGR](https://react-svgr.com/playground/?typescript=true) converts SVG files to React components

## Third Party Documentation

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
