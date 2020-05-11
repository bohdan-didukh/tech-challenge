import * as myFunctions from "../..";
import { INITIAL_USER } from "../addTestData.test";
import { testFunctions } from "../config";

const wrappedGetTotal = testFunctions.wrap(myFunctions.getTotal);

describe("calcTotal: empty", function () {
  test("no user", async function () {
    try {
      const data = await wrappedGetTotal(null);
      expect(data).toBeUndefined();
    } catch (err) {
      expect(err.code).toBe("invalid-argument");
    }
  });
  test("test empty basket", async function () {
    try {
      const data = await wrappedGetTotal(null, { auth: INITIAL_USER });
      expect(data).toEqual({ total: 0, subtotal: 0 });
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });
});
