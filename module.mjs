const stableAddress = 'https://nodejs.org/dist/index.json';
const nightlyAddress = 'https://nodejs.org/download/nightly/index.json';
const FETCH_TIMEOUT_MS = 10000;

const isSemVer = (x) => /^\d+\.\d+\.\d+/.test(x);

let versions = {};

const checkBuffer = (buffer, buildType) => {
  if (buildType === 'nightly') {
    // Match first version entry — the list is sorted newest-first by the API
    const match = /"version":"v(?<version>[^"]+)"/.exec(buffer);
    if (match && isSemVer(match.groups.version)) {
      versions.nightly = match.groups.version;
      return versions.nightly;
    }
    return false;
  }

  // Match version and lts fields within the same JSON entry.
  // Uses [\s\S] instead of [^}] to safely skip nested arrays/objects
  // like the "files" array, preventing breakage if the API adds nested objects.
  const objectRegex = /"version":"v(?<version>\d+\.\d+\.\d+)"[\s\S]*?"lts":(?<lts>false|"[^"]+")/g;

  let match;
  while ((match = objectRegex.exec(buffer)) !== null) {
    const { version, lts } = match.groups;
    if (!isSemVer(version)) continue;

    const isLts = lts !== 'false';

    if (isLts && !versions.lts) {
      versions.lts = version;
    }

    if (!isLts && !versions.current) {
      versions.current = version;
    }

    if (buildType === 'lts' && versions.lts) return versions.lts;
    if (buildType === 'current' && versions.current) return versions.current;
    if (buildType === 'both' && versions.lts && versions.current) return true;
  }

  return false;
};

async function fetchDataInChunks(buildType) {
  const url = buildType === 'nightly' ? nightlyAddress : stableAddress;
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

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

      // Keep buffer size manageable; objects are usually < 1000 chars, 10k is plenty.
      if (buffer.length > 10000) {
        buffer = buffer.slice(-5000);
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Clears the internal version cache, forcing the next call to re-fetch from the API.
 */
export function reset() {
  versions = {};
}

export default async function all() {
  await Promise.all([fetchDataInChunks('both'), fetchDataInChunks('nightly')]);
  return {
    lts: versions.lts,
    current: versions.current,
    nightly: versions.nightly,
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
