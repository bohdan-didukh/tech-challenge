import { OfferData, ProductData } from "../../../types/products";
import { Collections } from "../../../types";
import { getTestAdmin } from "./config";

export const INITIAL_USER = { uid: "bohdan" };

const testAdmin = getTestAdmin();

const WEEK = 1000 * 60 * 60 * 24 * 7; // one week
export const TEST_PRODUCTS: { [key: string]: ProductData } = {
  milk: {
    image:
      "https://cdn.pixabay.com/photo/2017/01/27/11/54/milk-bottle-2012800_960_720.png",
    name: "Milk",
    price: 130,
    type: "bottle",
  },
  apples: {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7UyBwdED752X-uNT2zO0mBkDfDj3Psotu8y77B4muSVFT-Icb&usqp=CAU",
    name: "Apples",
    price: 100,
    type: "bag",
  },
  bread: {
    image:
      "https://c0.wallpaperflare.com/preview/296/136/955/bread-loaf-white-isolated.jpg",
    name: "Bread",
    price: 80,
    type: "loaf",
  },
  soup: {
    image:
      "https://cdn.pixabay.com/photo/2017/06/14/16/03/noodle-2402571_960_720.png",
    name: "Soup",
    price: 65,
    type: "tin",
  },
};

export const TEST_OFFERS: { [key: string]: OfferData } = {
  apples_offer: {
    type: "discount",
    value: 0.1,
    start: testAdmin.firestore.Timestamp.fromMillis(Date.now() - WEEK),
    end: testAdmin.firestore.Timestamp.fromMillis(Date.now() + WEEK),
  },
  bread_offer: {
    type: "group",
    value: 0.5,
    start: testAdmin.firestore.Timestamp.fromMillis(Date.now() - WEEK),
    end: testAdmin.firestore.Timestamp.fromMillis(Date.now() + WEEK),
    products: {
      soup: {
        count: 2,
        image:
          "https://cdn.pixabay.com/photo/2017/06/14/16/03/noodle-2402571_960_720.png",
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
  const productsRef = testAdmin.firestore().collection(Collections.products);

  test("set products", async function () {
    const batch = Object.entries(TEST_PRODUCTS).reduce(
      (batch, [productID, productData]) => {
        return batch.set(productsRef.doc(productID), productData);
      },
      testAdmin.firestore().batch()
    );

    try {
      await batch.commit();
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
    const batch = testAdmin.firestore().batch();
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
