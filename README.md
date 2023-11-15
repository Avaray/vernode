# ❔ VERNODE

### [Vernode](https://www.npmjs.com/package/vernode) checks for latest NodeJS versions.

## Requirements
[NodeJS](https://nodejs.org/en/download) version **18.0.0** or higher because of [Fetch API](https://nodejs.org/en/blog/release/v18.0.0/).  

## Installation
By using [NPM](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry)  
`npm i vernode` 

By using [PNPM](https://pnpm.io/pnpm-cli)  
`pnpm add vernode`

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

## CLI usage without installation
You can use the [CLI](https://en.wikipedia.org/wiki/Command-line_interface) command without installing it by using [NPX](https://www.npmjs.com/package/npx) (it comes with [NPM](https://docs.npmjs.com/cli/v8/commands/npx/)).  
`npx vernode`

## CLI installation
By using [NPM](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry)  
`npm i -g vernode` 

By using [PNPM](https://pnpm.io/pnpm-cli)  
`pnpm add -g vernode`

## CLI usage

````bash
vernode
# LTS: 20.9.0
# Current: 21.2.0
# Nightly: 22.0.0

vernode json 
# { lts: '20.9.0', current: '21.2.0', nightly: '22.0.0' }

vernode lts
# 20.9.0

vernode current
# 21.2.0

vernode nightly
# 22.0.0

vernode help
# guess what it does
````

# Changelog
### Version 3.0.0
- The code has been restructured and the way the module is used has been changed.
- Optimized data fetching. Data fetching is done in parallel to reduce the execution time. The fetched data is split into chunks, allowing us to download much less data and receive results much faster.
- In the CLI, added the option to display data as JSON.
- All previous versions have been marked as deprecated.
