import { test, expect, describe } from "bun:test";
import all, { lts, current, nightly, last } from "../module.mjs";

const semverRegex = /^\d+\.\d+\.\d+$/;
const nightlyRegex = /^\d+\.\d+\.\d+(-nightly\d+\w+)?$/;

describe("vernode core logic", () => {
  test("all() returns all version types with valid formats", async () => {
    const versions = await all();

    expect(versions).toHaveProperty("lts");
    expect(versions).toHaveProperty("current");
    expect(versions).toHaveProperty("nightly");
    expect(versions).toHaveProperty("last");

    expect(versions.lts).toMatch(semverRegex);
    expect(versions.current).toMatch(semverRegex);
    expect(versions.nightly).toMatch(nightlyRegex);
    expect(versions.last).toMatch(semverRegex);
  }, 15000);

  test("lts() returns a valid semver version", async () => {
    const version = await lts();
    expect(version).toMatch(semverRegex);
  }, 10000);

  test("current() returns a valid semver version", async () => {
    const version = await current();
    expect(version).toMatch(semverRegex);
  }, 10000);

  test("nightly() returns a valid version string", async () => {
    const version = await nightly();
    expect(version).toMatch(nightlyRegex);
  }, 10000);

  test("last() returns a valid semver version", async () => {
    const version = await last();
    expect(version).toMatch(semverRegex);
  }, 10000);

  test("lts() major version is even (LTS releases are always even)", async () => {
    const version = await lts();
    const major = parseInt(version!.split(".")[0], 10);
    expect(major % 2).toBe(0);
  }, 10000);

  test("current() major version is greater than or equal to lts()", async () => {
    const [c, l] = await Promise.all([current(), lts()]);
    const currentMajor = parseInt(c!.split(".")[0], 10);
    const ltsMajor = parseInt(l!.split(".")[0], 10);
    expect(currentMajor).toBeGreaterThanOrEqual(ltsMajor);
  }, 10000);
});
