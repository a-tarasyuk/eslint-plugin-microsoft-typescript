# eslint-plugin-microsoft-typescript
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/a-tarasyuk/eslint-plugin-microsoft-typescript/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/eslint-plugin-microsoft-typescript.svg?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-microsoft-typescript) ![Travis (.com) master](https://img.shields.io/travis/com/a-tarasyuk/eslint-plugin-microsoft-typescript/master.svg?style=flat-square) [![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-microsoft-typescript.svg?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-microsoft-typescript)

## Installation

Make sure you have TypeScript and `@typescript-eslint/parser` installed, then install the plugin:

```
$ npm i eslint-plugin-microsoft-typescript --save-dev
```

## Usage
Add `@typescript-eslint/parser` to the parser field and `eslint-plugin-microsoft-typescript` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["microsoft-typescript"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["microsoft-typescript"],
  "rules": {
    "microsoft-typescript/rule-name": "error"
  }
}
```

## Rules

- `object-literal-surrounding-space`
- `no-type-assertion-whitespace`
- `type-operator-spacing`
- `no-double-space`
- `boolean-trivia`
- `no-in-operator`
- `debug-assert`


## License and Copyright

This software is released under the terms of the [MIT license](https://github.com/a-tarasyuk/eslint-plugin-microsoft-typescript/blob/master/LICENSE.md).
