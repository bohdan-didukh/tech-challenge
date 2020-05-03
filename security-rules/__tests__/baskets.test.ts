import {
  apps,
  assertFails,
  assertSucceeds,
  firestore,
} from "@firebase/testing";
import { Timestamp } from "@firebase/firestore-types";
import { BasketData, CollectionName, Collections } from "../../types";
import { authedApp, clearData, loadRules, USER } from "./config";
import { PRODUCT } from "./products.test";

export const BASKET: {
  id?: string;
  data: BasketData;
} = {
  data: {
    updated: firestore.FieldValue.serverTimestamp() as Timestamp,
    products: [PRODUCT.id],
  },
};

const CollectionBaskets: CollectionName = Collections.baskets;

describe(`test ${CollectionBaskets} collection`, function () {
  beforeAll(async function () {
    await loadRules();
  });

  test("user should be able to create a basket", async function () {
    const user = authedApp(USER);
    const reference = user
      .firestore()
      .collection(CollectionBaskets)
      .doc(USER.uid);
    await assertSucceeds(reference.set(BASKET.data));
  });

  test("user should not be able to read/write other users baskets", async function () {
    const user = authedApp(USER);
    const reference = user
      .firestore()
      .collection(CollectionBaskets)
      .doc("other-user-id");
    await assertFails(reference.get());
    await assertFails(reference.set(BASKET.data));
  });

  afterAll(async function () {
    await clearData();
    await Promise.all(apps().map((app) => app.delete()));
  });
});
