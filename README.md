<p align="center">
  <a href="https://www.trybento.co/?utm_source=github&utm_medium=logo" target="_blank">
    <img src="https://github.com/trybento/types/blob/main/docs/assets/bento.png?raw=true" alt="Bento" width="260" height="80">
  </a>
</p>

# Bento SDK Types

Common types used by Bento JavaScript SDKs.

[![npm version](https://img.shields.io/npm/v/@bentoapp/types.svg)](https://www.npmjs.com/package/@bentoapp/types)

## Links

- [Official installation docs](https://www.notion.so/trybento/Bento-installation-d860652453b34de89420a475df379a8e)
- [Bento website](https://www.trybento.co/?utm_source=github&utm_medium=hyperlink)

# Install

Simply run the command below:

```sh
npm install @bentoapp/types --save-dev
# OR yarn add @bentoapp/types --dev
```

## Usage

Right after installing it, you should be able to see the global type definitions when working with `window.Bento` or `window.bentoSettings`.

Additionally, you can manually import specific types you might want to reference inside your App, just like this:

```ts
import { BentoSettings } from "@bentoapp/types";
```
