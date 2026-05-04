const stableAddress = 'https://nodejs.org/dist/index.json';
const nightlyAddress = 'https://nodejs.org/download/nightly/index.json';

const isSemVer = (x) => /\d+\.\d+\.\d+/.test(x);

const versions = {};

const checkBuffer = (buffer, buildType) => {
  // Regex to find version and lts status in a JSON object chunk
  // Supports stable and nightly formats
  const objectRegex = /\{"version":"v(?<version>[^"]+)"[^}]+?"lts":(?<lts>false|"[^"]+")[^}]*?\}/g;
  
  if (buildType === 'nightly') {
    const match = /\{"version":"v(?<version>[^"]+)"/.exec(buffer);
    if (match && isSemVer(match.groups.version)) {
      versions.nightly = match.groups.version;
      return versions.nightly;
    }
    return false;
  }

  let match;
  while ((match = objectRegex.exec(buffer)) !== null) {
    const { version, lts } = match.groups;
    if (!isSemVer(version)) continue;

    const isLts = lts !== 'false';

    if (buildType === 'last' && !versions.last) {
      versions.last = version;
    }

    if (isLts && !versions.lts) {
      versions.lts = version;
    }

    if (!isLts && !versions.current) {
      versions.current = version;
    }

    // Check if we found what we needed
    if (buildType === 'lts' && versions.lts) return versions.lts;
    if (buildType === 'current' && versions.current) return versions.current;
    if (buildType === 'last' && versions.last) return versions.last;
    if (buildType === 'both' && versions.lts && versions.current) return true;
  }

  return false;
};

async function fetchDataInChunks(buildType) {
  const url = buildType === 'nightly' ? nightlyAddress : stableAddress;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      if (checkBuffer(buffer, buildType)) break;

      // Keep buffer size manageable, but large enough to contain an object
      // objects are usually < 1000 chars, so 10k is plenty.
      if (buffer.length > 10000) {
        buffer = buffer.slice(-5000);
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export default async function all() {
  await Promise.all([fetchDataInChunks('both'), fetchDataInChunks('nightly')]);
  return {
    lts: versions.lts,
    current: versions.current,
    nightly: versions.nightly,
    last: versions.last || versions.current
  };
}

export async function lts() {
  if (!versions.lts) await fetchDataInChunks('lts');
  return versions.lts;
}

export async function nightly() {
  if (!versions.nightly) await fetchDataInChunks('nightly');
  return versions.nightly;
}

export async function current() {
  if (!versions.current) await fetchDataInChunks('current');
  return versions.current;
}

export async function last() {
  if (!versions.last) await fetchDataInChunks('last');
  return versions.last;
}
