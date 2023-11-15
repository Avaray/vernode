# ❔ VERNODE

### [Vernode](https://www.npmjs.com/package/vernode) checks for latest NodeJS versions.

## Requirements
[NodeJS](https://nodejs.org/en/download) version **18.0.0** or higher because of [Fetch API](https://nodejs.org/en/blog/release/v18.0.0/).  
For older NodeJS versions please use [Vernode 1.0.6](https://www.npmjs.com/package/vernode/v/1.0.6).

## Installation
`npm i vernode` or `pnpm add vernode`

## Usage
````js
import vernode from 'vernode'

vernode()
    .then((obj) => console.log(obj))
    .catch((err) => console.error(err))
// { lts: '20.9.0', current: '21.2.0', nightly: '22.0.0' }

vernode()
    .then((obj) => console.log(obj.current))
    .catch((err) => console.error(err))
// 21.2.0
````

## CLI installation
`npm i -g vernode` or `pnpm add -g vernode`

## CLI usage

````bash
vernode
# LTS: 20.9.0
# Current: 21.2.0
# Nightly: 22.0.0

vernode lts
# 20.9.0

vernode current
# 21.2.0

vernode nightly
# 22.0.0

vernode help
# guess what it does
````
