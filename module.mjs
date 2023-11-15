// This removes Warning about experimental Fetch API feature
// eslint-disable-next-line no-undef
process.removeAllListeners('warning');

const URL_stables = 'https://nodejs.org/dist/index.json'
const URL_nightly = 'https://nodejs.org/download/nightly/index.json'

const versions = {}

const fetch_STABLES = async () => {
  try {
    const response = await fetch(URL_stables);
    const data = await response.json()
    versions.lts = data.find(e => e.lts != false).version.replace('v', '')
    versions.current = data.find(e => e.lts === false).version.replace('v', '')
  } catch (error) {
    /* empty */
  }
}

const fetch_NIGHTLY = async () => {
  try {
    const response = await fetch(URL_nightly);
    const data = await response.json()
    versions.nightly = data[0].version.replace('v', '').split('-')[0]
  } catch (error) {
    /* empty */
  }
}

export default async function (x) {

  switch (x) {
    case 'lts':
      await fetch_STABLES()
      return versions
    case 'current':
      await fetch_STABLES()
      return versions
    case 'nightly':
      await fetch_NIGHTLY()
      return versions
    default:
      await fetch_STABLES()
      await fetch_NIGHTLY()
      return versions
  }

}
