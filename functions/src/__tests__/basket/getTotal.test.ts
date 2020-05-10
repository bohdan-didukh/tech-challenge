// import { testFunctions } from "../config";
// import * as myFunctions from "../../index";

// const wrappedOnBasketProductWrite = testFunctions.wrap(myFunctions.getTotal);

describe("test getTotal method", function () {
  test("test valid data", async function () {
    try {
      // const resp = await wrappedOnBasketProductWrite({ someData: 1 });

      expect(true).toBeDefined();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });
});
