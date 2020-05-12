import { mayApplyOffer } from "../../basket";
import { BasketProduct } from "../../../../types";
import { OFFER_KEYS, TEST_OFFERS, TEST_PRODUCTS } from "../addTestData.test";
import { testFunctions } from "../config";
import * as admin from "firebase-admin";

/**
 * test mayApplyOffer function without sending second parameter(offer)
 */
describe("mayApplyOffer: no offer", function () {
  test("empty basket", async function () {
    const result = mayApplyOffer([]);
    expect(result).toBe(0);
  });

  test("valid product", function () {
    const products: BasketProduct[] = [
      {
        productID: Object.keys(TEST_PRODUCTS)[0],
        count: 5,
        price: 1, // any value
      },
    ];

    const snapList = products.map(
      (item) =>
        testFunctions.firestore.makeDocumentSnapshot(
          item,
          item.productID
        ) as admin.firestore.DocumentSnapshot
    );

    const result = mayApplyOffer(snapList);

    expect(result).toBe(0);
  });
});

/**
 * test this functions with discount type offer
 */
describe("mayApplyOffer: discount type offer", function () {
  test("discount type offer", function () {
    const { productID, offerID } = OFFER_KEYS[0];
    const products: BasketProduct[] = [
      {
        productID,
        count: 5,
        price: 2, // any value
        offerID,
      },
    ];

    const snapList = products.map(
      (item) =>
        testFunctions.firestore.makeDocumentSnapshot(
          item,
          item.productID
        ) as admin.firestore.DocumentSnapshot
    );

    const offerSnap = testFunctions.firestore.makeDocumentSnapshot(
      TEST_OFFERS[offerID],
      offerID
    );

    const result = mayApplyOffer(snapList, offerSnap);

    expect(result).toBe(Infinity);
  });
});

/**
 * test this functions with group type offer
 */
describe("mayApplyOffer: group type offer", function () {
  test("group type offer", function () {
    const { productID, offerID } = OFFER_KEYS[1];

    const products: BasketProduct[] = [
      {
        productID,
        count: 5,
        price: 2, // any value
        offerID,
      },
      {
        productID: "cCc0EJKiWe1mcvfkA2aX",
        count: 2,
        price: 2, // any value for test
      },
    ];

    const snapList = products.map(
      (item) =>
        testFunctions.firestore.makeDocumentSnapshot(
          item,
          item.productID
        ) as admin.firestore.DocumentSnapshot
    );

    const offerSnap = testFunctions.firestore.makeDocumentSnapshot(
      TEST_OFFERS[offerID],
      offerID
    );

    const result = mayApplyOffer(snapList, offerSnap);

    expect(result).toBe(1); // because only 2 soups
  });
});
