import {
  apps,
  assertFails,
  assertSucceeds,
  firestore,
} from "@firebase/testing";
import { Timestamp } from "@firebase/firestore-types";
import { BasketProduct, CollectionName, Collections } from "../../../types";
import { authedApp, clearData, loadRules, USER } from "../config";
import { createProduct, PRODUCT } from "../products/products.test";

export const BASKET_PRODUCT: {
  id?: string;
  data: BasketProduct;
} = {
  id: PRODUCT.id,
  data: {
    timestamp: firestore.FieldValue.serverTimestamp() as Timestamp,
    productID: PRODUCT.id,
    count: 1,
  },
};

const CollectionProducts: CollectionName = Collections.products;
const CollectionBaskets: CollectionName = Collections.baskets;

describe(`test ${CollectionBaskets}/{userID}/${CollectionProducts} collection`, function () {
  beforeAll(async function () {
    await loadRules();
    await createProduct();
  });

  test("user should be able to create a basket product", async function () {
    const user = authedApp(USER);
    const reference = user
      .firestore()
      .collection(CollectionBaskets)
      .doc(USER.uid)
      .collection(CollectionProducts)
      .doc(BASKET_PRODUCT.id);
    await assertSucceeds(reference.set(BASKET_PRODUCT.data));
  });

  test("user should not be able to read/write other users baskets", async function () {
    const user = authedApp(USER);
    const reference = user
      .firestore()
      .collection(CollectionBaskets)
      .doc("other-user-id")
      .collection(CollectionProducts)
      .doc(BASKET_PRODUCT.id);
    await assertFails(reference.get());
    await assertFails(reference.set(BASKET_PRODUCT.data));
  });

  afterAll(async function () {
    await clearData();
    await Promise.all(apps().map((app) => app.delete()));
  });
});
