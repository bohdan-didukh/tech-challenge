import { apps, assertSucceeds, firestore } from "@firebase/testing";
import { authedApp, clearData, getAdmin, loadRules, USER } from "../config";
import {
  CollectionName,
  Collections,
  OfferData,
  OfferTypes,
} from "../../../types";
import { PRODUCT } from "./products.test";

export const DAY = 1000 * 60 * 60 * 24; // day in seconds

export const OFFER: {
  id: string;
  data: OfferData;
} = {
  id: "offer-id",
  data: {
    value: 1,
    type: OfferTypes.discount,
    start: firestore.Timestamp.fromMillis(Date.now() - DAY),
    end: firestore.Timestamp.fromMillis(Date.now() + DAY),
  },
};

const CollectionProducts: CollectionName = Collections.products;
const CollectionOffers: CollectionName = Collections.offers;

describe(`test ${CollectionProducts}/${CollectionOffers} collection`, function () {
  beforeAll(async function () {
    await loadRules();
  });

  test("create offer with admin access", async function () {
    const admin = getAdmin();
    const reference = admin
      .firestore()
      .collection(CollectionProducts)
      .doc(PRODUCT.id)
      .collection(CollectionOffers)
      .doc(OFFER.id);

    await reference.set(OFFER.data);
    const doc = await reference.get();
    expect(doc.exists).toBeTruthy();
  });

  test("expect user to be able to read/list offer", async function () {
    const user = authedApp(USER);
    const offersCollection = user
      .firestore()
      .collection(CollectionProducts)
      .doc(PRODUCT.id)
      .collection(CollectionOffers);

    await assertSucceeds(offersCollection.get());
    await assertSucceeds(offersCollection.doc(OFFER.id).get());
  });

  afterAll(async function () {
    await clearData();
    await Promise.all(apps().map((app) => app.delete()));
  });
});
