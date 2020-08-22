# ❓ VERNODE

This NPM package checks for latest NodeJS versions.

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

#### TODO
[ ] CLI  
[ ] Add Nightly version