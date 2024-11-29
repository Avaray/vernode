# ❔ VERNODE

[Vernode](https://www.npmjs.com/package/vernode) checks for latest [NodeJS](https://nodejs.org/en/about) versions.  
You can use this as a [module](https://nodejs.org/api/esm.html#introduction) in your NodeJS program or as a [CLI command](https://en.wikipedia.org/wiki/Command-line_interface) in your system.

## Requirements

[NodeJS](https://nodejs.org/en/download) version **18.0.0** or higher because of [Fetch API](https://nodejs.org/en/blog/release/v18.0.0/).

## [Module](https://nodejs.org/api/esm.html#introduction) Installation

By using [NPM](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry)

```bash
npm i vernode
```

By using [PNPM](https://pnpm.io/pnpm-cli)

```bash
pnpm add vernode
```

By using [BUN](https://bun.sh/docs/cli/install)

```bash
bun i vernode
```

By using [DENO](https://docs.deno.com/) V2

```bash
deno i npm:vernode
```

## [Module](https://nodejs.org/api/esm.html#introduction) Usage

```js
import vernode, { lts, current, nightly } from 'vernode';

const versions = await vernode();

console.log(versions);
// { lts: '20.11.1', current: '21.6.2', nightly: '22.0.0' }

console.log(versions.lts); // 20.11.1
console.log(versions.current); // 21.6.2
console.log(versions.nightly); // 22.0.0

console.log(await lts()); // 20.11.1
console.log(await current()); // 21.6.2
console.log(await nightly()); // 22.0.0
```

## [CLI](https://en.wikipedia.org/wiki/Command-line_interface) installation

By using [NPM](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry)

```bash
npm i -g vernode
```

By using [PNPM](https://pnpm.io/pnpm-cli)

```bash
pnpm add -g vernode
```

By using [BUN](https://bun.sh/docs/cli/install)

```bash
bun i -g vernode
```

By using [DENO](https://docs.deno.com/runtime/reference/cli/install/) V2

```bash
deno i -g npm:vernode
```

## [CLI](https://en.wikipedia.org/wiki/Command-line_interface) usage

```bash
vernode
# LTS: 20.14.0
# Current: 22.2.0
# Nightly: 23.0.0

vernode json
# { lts: '20.14.0', current: '22.2.0', nightly: '23.0.0' }

vernode lts
# 20.14.0

vernode current
# 22.2.0

vernode nightly
# 23.0.0

vernode help
# guess what it does
```

## [CLI](https://en.wikipedia.org/wiki/Command-line_interface) usage without installation

By using `bunx` from [BUN](https://bun.sh/)

```bash
bunx vernode
```

By using [DENO](https://docs.deno.com/runtime/reference/cli/run/) V2

```bash
deno run --allow-net npm:vernode
```

By using `dlx` from [PNPM](https://pnpm.io/cli/dlx)

```bash
pnpm dlx vernode
```

# Changelog

### Version 3.0.0 - Breaking changes

- The code has been restructured and the way the module is used has been changed.
- Optimized data fetching. Data fetching is done in parallel to reduce the execution time. The fetched data is split into chunks, allowing us to download much less data and receive results much faster.
- In the CLI, added the option to display data as JSON.
- All previous versions have been marked as deprecated.
