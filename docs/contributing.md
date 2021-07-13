# Contributing to FPSMath

Thanks for showing your interest in using or contributing to this project

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request)

## Links

-   [Discord Server](https://discord.gg/Bg2gNT35s9) - Join to ask questions or to discuss this project with me and other contributors

## How to Setup

Using Nodejs above v14.0.0

1. Download the [Latest Release](https://github.com/AnimaFPS/fpsmath/releases/latest) or clone the repo(`git clone https://github.com/AnimaFPS/fpsmath.git`)
2. Navigate and open a command prompt or terminal in the root directory
3. Install dependencies

```shell
yarn
```

or

```shell
npm i
```

4. Create a .env file for environment variables
    1. `DISCORD_TOKEN` for the discord bot token
    2. `OWNER_ID` for the owners discord id
5. To run you execute the start script with

```shell
yarn start
```

or

```shell
npm run start
```

6. Code as much as you want

## How to submit changes

1. Stage the changes(`git add .`)
2. Lint-staged and commit with script (`yarn commit` or `yarn cz`)/ [commitizen](https://https://github.com/commitizen/cz-cli) to make sure all push requests and commits are uniform
3. Push to a pull request

## How to report a bug

Click this link: [Make a new issue](https://github.com/AnimaFPS/fpsmath/issues/new?assignees=&labels=&template=bug_report.md&title=)

## How to request a feature, New command or New Supported game/unit

Click this link: [Make a new issue](https://github.com/AnimaFPS/fpsmath/issues/new?assignees=&labels=&template=feature_request.md&title=)

## Style guide

This project uses

-   [Commitizen](https://https://github.com/commitizen/cz-cli) for the commit messages
-   [Prettier](https://prettier.io/) for the code styling
