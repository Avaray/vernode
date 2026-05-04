#!/usr/bin/env sh
':' //; command -v node >/dev/null 2>&1 && exec node "$0" "$@"; command -v bun >/dev/null 2>&1 && exec bun "$0" "$@"; command -v deno >/dev/null 2>&1 && exec deno run "$0" "$@"; echo "Error: Please install node, bun, or deno" >&2; exit 1

import all, { lts, current, nightly, last } from './module.mjs';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));

const args = process.argv.slice(2);

const isJson = args.some(arg => /^(-j|--json)$/.test(arg));
const isVersion = args.some(arg => /^(-v|--version)$/.test(arg));
const isHelp = args.some(arg => /^(-h|--help|help)$/.test(arg));

function help() {
  console.log(`
vernode v${pkg.version} - Checks for latest NodeJS versions

Usage:
  vernode [command] [options]

Commands:
  (none)            Show all versions (LTS, Current, Nightly)
  l, lts            Show latest LTS version
  c, current        Show latest Current version
  n, nightly        Show latest Nightly version
  last              Show absolute latest stable version
  help              Show this help message

Options:
  -j, --json        Output data in JSON format
  -v, --version     Show version number
  -h, --help        Show this help message

Examples:
  vernode
  vernode lts
  vernode current --json
`);
}

function formatData(data) {
  if (isJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  const keys = Object.keys(data);
  if (keys.length === 1) {
    console.log(data[keys[0]]);
  } else {
    if (data.lts) console.log(`LTS:     ${data.lts}`);
    if (data.current) console.log(`Current: ${data.current}`);
    if (data.nightly) console.log(`Nightly: ${data.nightly}`);
    if (data.last) console.log(`Last:    ${data.last}`);
  }
}

async function run() {
  if (isHelp) {
    help();
    return;
  }

  if (isVersion) {
    console.log(pkg.version);
    return;
  }

  // Filter out options to find the command
  const command = args.find(arg => !arg.startsWith('-'));

  try {
    if (!command) {
      const versions = await all();
      formatData(versions);
    } else {
      switch (command.toLowerCase()) {
        case 'l':
        case 'lts':
          formatData({ lts: await lts() });
          break;
        case 'c':
        case 'current':
          formatData({ current: await current() });
          break;
        case 'n':
        case 'nightly':
          formatData({ nightly: await nightly() });
          break;
        case 'last':
          formatData({ last: await last() });
          break;
        default:
          console.error(`Unknown command: ${command}`);
          console.log('Type "vernode help" to see available commands');
          process.exit(1);
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

run();
