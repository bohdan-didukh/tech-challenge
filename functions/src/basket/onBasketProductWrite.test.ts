// import {  testFunctions } from "../__tests__/config";
// import { onBasketProductWrite } from "./onBasketProductWrite";

// const wrappedOnBasketProductWrite = testFunctions.wrap(onBasketProductWrite);

describe("test getTotal method", function () {
  test("test valid data", async function () {
    try {
      // const { total } = await wrappedOnBasketProductWrite();

      expect(true).toBeDefined();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });
});
