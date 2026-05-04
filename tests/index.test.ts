import { test, expect, describe } from "bun:test";
import all, { lts, current, nightly } from "../module.mjs";

describe("vernode core logic", () => {
  test("all() returns all version types", async () => {
    const versions = await all();
    expect(versions).toHaveProperty("lts");
    expect(versions).toHaveProperty("current");
    expect(versions).toHaveProperty("nightly");
    
    expect(versions.lts).toMatch(/^\d+\.\d+\.\d+$/);
    expect(versions.current).toMatch(/^\d+\.\d+\.\d+$/);
    expect(versions.nightly).toMatch(/^\d+\.\d+\.\d+(-nightly\d+\w+)?$/);
  }, 15000); // Increase timeout for network

  test("lts() returns a valid version", async () => {
    const version = await lts();
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  }, 10000);

  test("current() returns a valid version", async () => {
    const version = await current();
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  }, 10000);

  test("nightly() returns a valid version", async () => {
    const version = await nightly();
    expect(version).toMatch(/^\d+\.\d+\.\d+(-nightly\d+\w+)?$/);
  }, 10000);
});
