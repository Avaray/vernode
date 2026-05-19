# ❔ VERNODE

[Vernode](https://www.npmjs.com/package/vernode) checks for latest
[NodeJS](https://nodejs.org/en/about) versions.\
You can use this as a [module](https://nodejs.org/api/esm.html#introduction) in
your NodeJS program or as a
[CLI command](https://en.wikipedia.org/wiki/Command-line_interface) in your
system.

## Requirements

[NodeJS](https://nodejs.org/en/download) version **18.0.0** or higher because of
[Fetch API](https://nodejs.org/en/blog/release/v18.0.0/).

## [Module](https://nodejs.org/api/esm.html#introduction) Installation

[NPM](https://docs.npmjs.com/cli/v11/commands/npm-install)

```bash
npm i vernode
```

[PNPM](https://pnpm.io/cli/add)

```bash
pnpm add vernode
```

[BUN](https://bun.com/docs/guides/install/add)

```bash
bun add vernode
```

[DENO](https://docs.deno.com/runtime/reference/cli/add/)

```bash
deno add npm:vernode
```

## [Module](https://nodejs.org/api/esm.html#introduction) Usage

```js
import vernode, { current, lts, nightly, reset } from "vernode";

const versions = await vernode();

versions;
// { lts: '24.15.0', current: '25.9.0', nightly: '26.0.0-nightly...' }

versions.lts; // 24.15.0
versions.current; // 25.9.0
versions.nightly; // 26.0.0-nightly...

await lts(); // 24.15.0
await current(); // 25.9.0
await nightly(); // 26.0.0-nightly...

// In long-running processes, clear the cache to re-fetch fresh data
reset();
```

## [CLI](https://en.wikipedia.org/wiki/Command-line_interface) installation

[NPM](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry)

```bash
npm i -g vernode
```

[PNPM](https://pnpm.io/pnpm-cli)

```bash
pnpm add -g vernode
```

[BUN](https://bun.sh/docs/cli/install)

```bash
bun i -g vernode
```

[DENO](https://docs.deno.com/runtime/reference/cli/install/) V2

```bash
deno i -g npm:vernode
```

## [CLI](https://en.wikipedia.org/wiki/Command-line_interface) usage

```bash
vernode
# LTS:     24.15.0
# Current: 25.9.0
# Nightly: 26.0.0-nightly...

vernode lts      # 24.15.0
vernode current  # 25.9.0
vernode nightly  # 26.0.0-nightly...

vernode json     # {"lts": "24.15.0", "current": "25.9.0", "nightly": "26.0.0-nightly..."}
vernode -j       # same as above via flag

vernode help
vernode -v       # print vernode version
```

## [CLI](https://en.wikipedia.org/wiki/Command-line_interface) usage without installation

[NPM](https://docs.npmjs.com/cli/v11/commands/npx)

```bash
npx vernode
```

[PNPM](https://pnpm.io/cli/pnx)

```bash
pnx vernode
```

[BUN](https://bun.sh/docs/cli/bunx)

```bash
bunx vernode
```

[DENO](https://docs.deno.com/runtime/reference/cli/run/)

```bash
deno run --allow-net --allow-read npm:vernode
```
