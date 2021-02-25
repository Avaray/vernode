# ❓ VERNODE

[This NPM package](https://www.npmjs.com/package/vernode) checks for latest NodeJS versions.

`npm i vernode`

````js
const vernode = require('vernode')

vernode()
    .then((o) => console.log(o))
    .catch((err) => console.error(err))
// { lts: '12.18.3', current: '14.8.0' }

vernode()
    .then((o) => console.log(o.current))
    .catch((err) => console.error(err))
// 14.8.0
````

#### CLI usage
`npm i -g vernode`

````
vernode
// LTS: 12.18.3
// Current: 14.8.0

vernode lts
// 12.18.3

vernode current
// 14.8.0

vernode nightly
// 16.0.0

vernode help
// guess what it does
````

#### TODO
[] Add Nightly version