#!/usr/bin/env node

import all, { lts, current, nightly } from './module.mjs';

const args = process.argv.slice(2);

function formatData(data) {
  if (args.find((arg) => /^j+[son]*$/im.test(arg))) {
    console.log(data);
  } else if (Object.keys(data).length === 1) {
    console.log(data[Object.keys(data)[0]]);
  } else {
    data.lts && console.log(`LTS: ${data.lts}`);
    data.current && console.log(`Current: ${data.current}`);
    data.nightly && console.log(`Nightly: ${data.nightly}`);
  }
}

if (args.length === 0) {
  const versions = await all();
  formatData(versions);
} else {
  switch (args[0].toLowerCase()) {
    case /^-*[h\?]+[elp]*$/m.test(args[0]) ? args[0] : '':
      help();
      break;
    case 'l':
    case 'lts':
      const ltsVersion = await lts();
      formatData({ lts: ltsVersion });
      break;
    case 'c':
    case 'current':
      const currentVersion = await current();
      formatData({ current: currentVersion });
      break;
    case 'n':
    case 'nightly':
      const nightlyVersion = await nightly();
      formatData({ nightly: nightlyVersion });
      break;
    default:
      console.log('Type "vernode help" to see available commands');
  }
}

function help() {
  console.log('\nShow all versions (LTS, Current and Nightly)');
  console.log('Just run this app without arguments\n');

  console.log('Show LTS version (l, lts)');
  console.log('Example: vernode lts\n');

  console.log('Show Current version (c, current)');
  console.log('Example: vernode current\n');

  console.log('Show Nightly version (n, nightly)');
  console.log('Example: vernode nightly\n');
}
