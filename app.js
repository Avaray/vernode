module.exports = function() {
    return new Promise((resolve, reject) => {
        const https = require('https')
        const request = https.get('https://nodejs.org/en/', (res) => {
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