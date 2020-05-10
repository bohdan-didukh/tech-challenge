import {
  apps,
  assertFails,
  assertSucceeds,
  firestore,
} from "@firebase/testing";
import { Timestamp } from "@firebase/firestore-types";
import { BasketData, CollectionName, Collections } from "../../../types";
import { authedApp, clearData, loadRules, USER } from "../config";

export const BASKET: {
  id?: string;
  data: BasketData;
} = {
  data: {
    updated: firestore.FieldValue.serverTimestamp() as Timestamp,
  },
};

const CollectionBaskets: CollectionName = Collections.baskets;

describe(`test ${CollectionBaskets} collection`, function () {
  let user, reference; // current user and his basket reference
  beforeAll(async function () {
    await loadRules();

    user = authedApp(USER);
    reference = user.firestore().collection(CollectionBaskets).doc(USER.uid);
  });

  test("user should be able to read his basket", async function () {
    await assertSucceeds(reference.get());
  });

  test("user should not be able to create a basket", async function () {
    await assertFails(reference.set(BASKET.data));
  });

  test("user should not be able to read/write other users baskets", async function () {
    const otherUserBasket = user
      .firestore()
      .collection(CollectionBaskets)
      .doc("other-user-id");
    await assertFails(otherUserBasket.get());
    await assertFails(otherUserBasket.set(BASKET.data));
  });

  afterAll(async function () {
    await clearData();
    await Promise.all(apps().map((app) => app.delete()));
  });
});
