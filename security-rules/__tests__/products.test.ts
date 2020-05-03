import { apps } from "@firebase/testing";
import { clearData, loadRules } from "./config";

describe("test roles collection", function () {
  beforeAll(async function () {
    await loadRules();
  });

  test("true", function () {
    expect(true).toBe(true);
  });

  afterAll(async function () {
    await clearData();
    await Promise.all(apps().map((app) => app.delete()));
  });
});
