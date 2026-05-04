import { test, expect, describe } from "bun:test";
import all, { lts, current, nightly } from "../module.mjs";

const semverRegex = /^\d+\.\d+\.\d+$/;
const nightlyRegex = /^\d+\.\d+\.\d+(-nightly\d+\w+)?$/;

describe("vernode core logic", () => {
  test("all() returns all version types with valid formats", async () => {
    const versions = await all();

    expect(versions).toHaveProperty("lts");
    expect(versions).toHaveProperty("current");
    expect(versions).toHaveProperty("nightly");
    
    // Ensure the object contains exactly the 3 expected version types
    expect(Object.keys(versions)).toHaveLength(3);

    expect(versions.lts).toMatch(semverRegex);
    expect(versions.current).toMatch(semverRegex);
    expect(versions.nightly).toMatch(nightlyRegex);
  }, 15000);

  test("individual functions return valid versions", async () => {
    const [l, c, n] = await Promise.all([lts(), current(), nightly()]);
    expect(l).toMatch(semverRegex);
    expect(c).toMatch(semverRegex);
    expect(n).toMatch(nightlyRegex);
  }, 15000);

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

describe("vernode CLI integration", () => {
  const cliPath = "./cli.mjs";

  test("cli returns human readable format by default", async () => {
    const proc = Bun.spawn(["bun", cliPath], { stdout: "pipe" });
    const output = await new Response(proc.stdout).text();
    expect(output).toContain("LTS:");
    expect(output).toContain("Current:");
    expect(output).toContain("Nightly:");
  }, 10000);

  test("cli returns valid JSON with --json flag", async () => {
    const proc = Bun.spawn(["bun", cliPath, "--json"], { stdout: "pipe" });
    const output = await new Response(proc.stdout).text();
    const json = JSON.parse(output);
    expect(json.lts).toMatch(semverRegex);
    expect(json.current).toMatch(semverRegex);
    expect(json.nightly).toMatch(nightlyRegex);
  }, 10000);

  test("cli returns single version for lts command", async () => {
    const proc = Bun.spawn(["bun", cliPath, "lts"], { stdout: "pipe" });
    const output = (await new Response(proc.stdout).text()).trim();
    expect(output).toMatch(semverRegex);
  }, 10000);

  test("cli returns JSON for lts command with -j flag", async () => {
    const proc = Bun.spawn(["bun", cliPath, "lts", "-j"], { stdout: "pipe" });
    const output = await new Response(proc.stdout).text();
    const json = JSON.parse(output);
    expect(json).toHaveProperty("lts");
    expect(json.lts).toMatch(semverRegex);
    expect(Object.keys(json)).toHaveLength(1);
  }, 10000);

  test("cli returns JSON for all versions via 'json' command", async () => {
    const proc = Bun.spawn(["bun", cliPath, "json"], { stdout: "pipe" });
    const output = await new Response(proc.stdout).text();
    const json = JSON.parse(output);
    expect(json).toHaveProperty("lts");
    expect(json).toHaveProperty("current");
    expect(json).toHaveProperty("nightly");
  }, 10000);

  test("cli shows help with help command", async () => {
    const proc = Bun.spawn(["bun", cliPath, "help"], { stdout: "pipe" });
    const output = await new Response(proc.stdout).text();
    expect(output.toLowerCase()).toContain("usage:");
  }, 10000);

  test("cli exits with error on unknown command", async () => {
    const proc = Bun.spawn(["bun", cliPath, "invalid-cmd"], { stderr: "pipe" });
    await proc.exited;
    expect(proc.exitCode).toBe(1);
  }, 10000);
});
