import { OfferData, ProductData } from "../../../types/products";
import { Collections } from "../../../types";
import { getAdmin } from "../initializeAdmin";

const admin = getAdmin();

export const INITIAL_USER = { uid: "bohdan" };

const WEEK = 1000 * 60 * 60 * 24 * 7; // one week
export const TEST_PRODUCTS: { [key: string]: ProductData } = {
  milk: {
    image: "https://basket-challenge.web.app/static/milk.png",
    name: "Milk",
    price: 130,
    type: "bottle",
  },
  apples: {
    image: "https://basket-challenge.web.app/static/apple.jpg",
    name: "Apples",
    price: 100,
    type: "bag",
  },
  bread: {
    image: "https://basket-challenge.web.app/static/bread.jpg",
    name: "Bread",
    price: 80,
    type: "loaf",
  },
  soup: {
    image: "https://basket-challenge.web.app/static/soup.png",
    name: "Soup",
    price: 65,
    type: "tin",
  },
};

export const TEST_OFFERS: { [key: string]: OfferData } = {
  apples_offer: {
    type: "discount",
    name: "Apples 10% off",
    value: 0.1,
    start: admin.firestore.Timestamp.fromMillis(Date.now() - WEEK),
    end: admin.firestore.Timestamp.fromMillis(Date.now() + WEEK),
  },
  bread_offer: {
    type: "group",
    name: "Bread 50% off",
    value: 0.5,
    start: admin.firestore.Timestamp.fromMillis(Date.now() - WEEK),
    end: admin.firestore.Timestamp.fromMillis(Date.now() + WEEK),
    products: {
      soup: {
        count: 2,
        image: "https://basket-challenge.web.app/static/soup.png",
      },
    },
  },
};

export const OFFER_KEYS = [
  {
    productID: Object.keys(TEST_PRODUCTS)[1],
    offerID: Object.keys(TEST_OFFERS)[0],
  },
  {
    productID: Object.keys(TEST_PRODUCTS)[2],
    offerID: Object.keys(TEST_OFFERS)[1],
  },
];

/**
 * There are two ways to test cloud functions. I am using online mode as recommended by firebase
 * https://firebase.google.com/docs/functions/unit-testing#initializing
 */

describe("set test products", function () {
  const productsRef = admin.firestore().collection(Collections.products);

  test("set products", async function () {
    const writeBatch = Object.entries(TEST_PRODUCTS).reduce(
      (batch, [productID, productData]) => {
        return batch.set(productsRef.doc(productID), productData);
      },
      admin.firestore().batch()
    );

    try {
      await writeBatch.commit();
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test("expect products to be defined", async function () {
    try {
      const products = await Promise.all(
        Object.keys(TEST_PRODUCTS).map((key) => productsRef.doc(key).get())
      );
      products.map((doc) => expect(doc.exists).toBeTruthy());
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test("set offers", async function () {
    const batch = admin.firestore().batch();
    OFFER_KEYS.forEach(({ productID, offerID }) => {
      const reference = productsRef
        .doc(productID)
        .collection(Collections.offers)
        .doc(offerID);
      batch.set(reference, TEST_OFFERS[offerID]);
    });

    try {
      await batch.commit();
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test("expect offers to be defined", async function () {
    try {
      const offers = await Promise.all(
        OFFER_KEYS.map(({ productID, offerID }) =>
          productsRef
            .doc(productID)
            .collection(Collections.offers)
            .doc(offerID)
            .get()
        )
      );

      offers.forEach((offer) => expect(offer.exists).toBeTruthy());
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });
});
