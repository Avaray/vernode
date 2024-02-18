const stableAddress = 'https://nodejs.org/dist/index.json';
const nightlyAddress = 'https://nodejs.org/download/nightly/index.json';

const ltsRegex = /(?:{"version":"v)(?<version>[\d\.]+)(?:-?.+"lts":[^false].+})/;
const currentAndNightlyRegex = /(?:{"version":"v)(?<version>[\d\.]+)(?:-?.+"lts":false.+})/;

const isSemVer = (x) => /\d+\.\d+\.\d+/.test(x);

const versions = {};

const checkChunk = (chunk, buildType, regex) => {
  const match = chunk.match(regex);
  if (match) {
    const version = match.groups.version;
    if (isSemVer(version)) {
      versions[buildType] = version;
      // console.log(`Found ${buildType} version: ${version}`);
      return version;
    } else {
      return false;
    }
  }
};

// Function to download data in chunks
// In this way we will get version number a bit faster and download less data
async function fetchDataInChunks(buildType) {
  const response = await fetch(buildType === 'nightly' ? nightlyAddress : stableAddress);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const reader = response.body.getReader();
  let chunk = await reader.read();

  while (!chunk.done) {
    const chunkText = new TextDecoder().decode(chunk.value);

    // We can use just one fetch for both 'lts' and 'current' versions
    if (buildType === 'both') {
      if (versions.lts && versions.current) break;
      !versions.lts && checkChunk(chunkText, 'lts', ltsRegex);
      !versions.current && checkChunk(chunkText, 'current', currentAndNightlyRegex);
    } else {
      if (checkChunk(chunkText, buildType, buildType === 'lts' ? ltsRegex : currentAndNightlyRegex)) {
        break;
      }
    }
    // Continue reading the next chunk...
    chunk = await reader.read();
  }
}

export default async function all() {
  const promises = [fetchDataInChunks('both'), fetchDataInChunks('nightly')];
  await Promise.all(promises);
  return versions;
}

export async function lts() {
  await fetchDataInChunks('lts');
  return versions.lts;
}

export async function nightly() {
  await fetchDataInChunks('nightly');
  return versions.nightly;
}

export async function current() {
  await fetchDataInChunks('current');
  return versions.current;
}
