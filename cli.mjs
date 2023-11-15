#!/usr/bin/env node

import vernode from './module.mjs';

const args = process.argv.slice(2)

function Format(data) {
  if (args.find(arg => /^js/i.test(arg))) {
    console.log(data)
  } else {
    data.lts && console.log(`LTS: ${data.lts}`);
    data.current && console.log(`Current: ${data.current}`);
    data.nightly && console.log(`Nightly: ${data.nightly}`);
  }
}

if (args.length === 0 || args.find(arg => /^js/i.test(arg))) {
  vernode()
    .then((x) => Format(x))
    .catch((err) => console.error(err));
} else {
  switch (args[0].toLowerCase()) {
    case 'h':
    case '-h':
    case 'help':
    case '-help':
    case '--help':
    case 'usage':
    case '?':
      HELP();
      break;
    case 'l':
    case 'lts':
      vernode('lts').then((x) => console.log(x.lts)).catch((err) => console.error(err));
      break;
    case 'c':
    case 'current':
      vernode('current').then((x) => console.log(x.current)).catch((err) => console.error(err));
      break;
    case 'n':
    case 'nightly':
      vernode('nightly').then((x) => console.log(x.nightly)).catch((err) => console.error(err));
      break;
    default:
      console.log('Type "vernode help" to see available commands');
  }
}

function HELP() {

  console.log('\nShow all versions (LTS, Current and Nightly)');
  console.log('Just run this app without arguments\n');

  console.log('Show LTS version (l, lts)');
  console.log('Example: vernode lts\n');

  console.log('Show Current version (c, current)');
  console.log('Example: vernode current\n');

  console.log('Show Nightly version (n, nightly)');
  console.log('Example: vernode nightly\n');

}
