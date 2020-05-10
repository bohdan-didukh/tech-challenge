import {
  apps,
  assertFails,
  assertSucceeds,
  firestore,
} from "@firebase/testing";
import { BasketProduct, CollectionName, Collections } from "../../../types";
import { authedApp, clearData, loadRules, USER } from "../config";
import { createProduct, PRODUCT } from "../products/products.test";
import { createOffer, OFFER } from "../products/offers.test";

export const BASKET_PRODUCT: {
  id?: string;
  data: BasketProduct;
} = {
  id: PRODUCT.id,
  data: {
    timestamp: firestore.FieldValue.serverTimestamp(),
    productID: PRODUCT.id,
    count: 1,
    price: PRODUCT.data.price,
  },
};

const CollectionProducts: CollectionName = Collections.products;
const CollectionBaskets: CollectionName = Collections.baskets;

describe(`test ${CollectionBaskets}/{userID}/${CollectionProducts} collection`, function () {
  let user, reference; // current user and his basket product reference

  beforeAll(async function () {
    await loadRules();
    await createProduct(); // create test product
    await createOffer(); // create test offer

    user = await authedApp(USER);

    // basket product reference
    reference = user
      .firestore()
      .collection(CollectionBaskets)
      .doc(USER.uid)
      .collection(CollectionProducts)
      .doc(BASKET_PRODUCT.id);
  });

  /**
   * it is a successful case and may be as an example for the front-end side
   */
  test("user should be able to create a basket product with a valid data", async function () {
    await assertSucceeds(reference.set(BASKET_PRODUCT.data));
  });

  test("user should be able to create a basket product with a valid data and offer", async function () {
    await assertSucceeds(
      reference.set({
        ...BASKET_PRODUCT.data,
        offerID: OFFER.id,
      })
    );
  });

  test("user should not be able to create/update a basket product with invalid price value", async function () {
    await assertFails(
      reference.set({ ...BASKET_PRODUCT.data, price: PRODUCT.data.price * 0.1 })
    );
  });

  test("it should fail when the count value is invalid", async function () {
    await assertFails(reference.set({ ...BASKET_PRODUCT.data, count: -1 }));
    await assertFails(reference.set({ ...BASKET_PRODUCT.data, count: 0 }));
    await assertFails(reference.set({ ...BASKET_PRODUCT.data, count: false }));
    await assertFails(
      reference.set({ ...BASKET_PRODUCT.data, count: Infinity })
    );
    await assertFails(
      reference.set({ ...BASKET_PRODUCT.data, count: "some wrong value" })
    );
  });

  test("it should fail when there are any additional data", async function () {
    await assertFails(
      reference.set({ ...BASKET_PRODUCT.data, wrongFieldName: false })
    );
  });

  test("user should not be able to read/write other users baskets", async function () {
    const otherUserBasketProductReference = user
      .firestore()
      .collection(CollectionBaskets)
      .doc("other-user-id")
      .collection(CollectionProducts)
      .doc(BASKET_PRODUCT.id);
    await assertFails(otherUserBasketProductReference.get());
    await assertFails(otherUserBasketProductReference.set(BASKET_PRODUCT.data));
  });

  test("it should fail when the offerID is invalid", async function () {
    await assertFails(
      reference.set({ ...BASKET_PRODUCT.data, offerID: "invalid-offer-id" })
    );
  });

  afterAll(async function () {
    await clearData();
    await Promise.all(apps().map((app) => app.delete()));
  });
});
