// This removes Warning about experimental Fetch API feature
process.removeAllListeners('warning');

var versions = {}

async function STABLE() {
    return await new Promise((resolve, reject) => {
        fetch('https://nodejs.org/dist/index.json')
            .then((response) => response.json())
            .then((data) => {
                versions.lts = data.find(e => e.lts != false).version.replace('v','')
                versions.current = data.find(e => e.lts === false).version.replace('v','')
                resolve(versions)
            })
    })
}

async function NIGHTLY() {
    return await new Promise((resolve, reject) => {
        fetch('https://nodejs.org/download/nightly/index.json')
            .then((response) => response.json())
            .then((data) => {
                versions.nightly = data[0].version.replace('v','').split('-')[0]
                resolve(versions)
            })
    })
}

module.exports = async function(x) {

    switch (x) {
        case 'lts':
        case 'current':
            await STABLE()
            return versions
        case 'nightly':
            await NIGHTLY()
            return versions
        default:
            await Promise.all([STABLE(), NIGHTLY()])
            return versions
    }

}
