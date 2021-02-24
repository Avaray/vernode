#!/usr/bin/env node

const package = require('./package')
const vernode = require('./app')

if (!process.argv[2]) {
    VERNODE()
    .then((o) => console.log('LTS: ' + o.lts + '\nCurrent: ' + o.current ))
    .catch((err) => console.error(err));
} else {
    switch (process.argv[2].toLowerCase()) {
        case 'h':
        case '-h':
        case 'help':
        case '-help':
        case '--help':
        case 'usage':
            HELP();
            break;
        case 'v':
        case 'ver':
        case 'version':
        case '--v':
        case '--version':
            console.log(package.version);
            break;
        case 'l':
        case 'long':
        case 'lts':
            VERNODE().then((o) => console.log(o.lts)).catch((err) => console.error(err));
            break;
        case 'c':
        case 'latest':
        case 'current':
            VERNODE().then((o) => console.log(o.current)).catch((err) => console.error(err));
            break;
        // case 'n':
        // case 'future':
        // case 'nightly':
        //     VERNODE().then((o) => console.log(o.nightly)).catch((err) => console.error(err));
        //     break;
        default:
            console.log('Type "vernode help" to see available commands');
    }
}

function VERNODE() {
    return new Promise((resolve, reject) => {
        const request = require('https').get('https://nodejs.org/en/', (res) => {
            let a, b = {}
            res.on('data', x => {
                a += x;
            })
            res.on('end', () => {
                let r = /(?<=data-version="v).*(?=")/gm
                b.lts = a.match(r)[0]
                b.current = a.match(r)[1]
                resolve(b)
            })
        })
        request.on('error', (err) => reject(err))
    })
}

function HELP() {
    console.log('\nVernode ' + package.version + '\n');

    console.log('Show LTS version (l, long, lts)');
    console.log('Example: vernode lts\n');

    console.log('Show Current version (c, current, latest)');
    console.log('Example: vernode current');
}
