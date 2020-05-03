import { testFunctions } from "../config";
import { getTotal } from "../../";
const wrappedGetTotal = testFunctions.wrap(getTotal);

describe("test getTotal method", function () {
  test("test valid data", async function () {
    try {
      const { total } = await wrappedGetTotal(null, {
        auth: { uid: "Bohdan" },
      });

      expect(total).toBeDefined();
      expect(0).toBeLessThanOrEqual(total);
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  test("test invalid data", async function () {
    try {
      await wrappedGetTotal(null);
    } catch ({ code }) {
      expect(code).toBe("unauthenticated");
    }
  });
});
