#!/usr/bin/env node

var vernode = require('./module');

if (!process.argv[2]) {
    vernode()
    .then((x) => console.log(`LTS: ${x.lts}\nCurrent: ${x.current}\nNightly: ${x.nightly}`))
    .catch((err) => console.error(err));
} else {
    switch (process.argv[2].toLowerCase()) {
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

    console.log(`\nVernode ${require('./package').version}\n`);
    
    console.log('Show all versions (LTS, Current and Nightly)')
    console.log('Just run this app without arguments\n')

    console.log('Show LTS version (l, lts)')
    console.log('Example: vernode lts\n')

    console.log('Show Current version (c, current)')
    console.log('Example: vernode current\n')

    console.log('Show Nightly version (n, nightly)')
    console.log('Example: vernode nightly\n')

}
