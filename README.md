# ❔ VERNODE

### [Vernode](https://www.npmjs.com/package/vernode) checks for latest NodeJS versions.

## Requirements
[NodeJS](https://nodejs.org/en/download) version **18.0.0** or higher because of [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).  
For older NodeJS versions please use [Vernode 1.0.6](https://www.npmjs.com/package/vernode/v/1.0.6).

## Installation
`npm i vernode` or `pnpm add vernode`

## Usage
````js
const vernode = require('vernode')

vernode()
    .then((o) => console.log(o))
    .catch((err) => console.error(err))
// { lts: '18.12.1', current: '19.2.0', nightly: '20.0.0' }

vernode()
    .then((o) => console.log(o.current))
    .catch((err) => console.error(err))
// 19.2.0
````

## CLI installation
`npm i -g vernode` or `pnpm add -g vernode`

## CLI usage

````bash
vernode
# LTS: 18.12.1
# Current: 19.2.0
# Nightly: 20.0.0

vernode lts
# 18.12.1

vernode current
# 19.2.0

vernode nightly
# 20.0.0

vernode help
# guess what it does
````
