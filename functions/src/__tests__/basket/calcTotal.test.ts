import { calcTotal } from "../../";

import {
  INITIAL_USER,
  OFFER_KEYS,
  TEST_OFFERS,
  TEST_PRODUCTS,
} from "../addTestData.test";
import { getAdmin } from "../../initializeAdmin";
import { BasketProduct, Collections } from "../../../../types";

const admin = getAdmin();

describe("calcTotal: empty", function () {
  test("no user", async function () {
    try {
      const data = await calcTotal((null as unknown) as string);
      expect(data).toBeUndefined();
    } catch (err) {
      expect(err.code).toBe("invalid-argument");
    }
  });
  test("test empty basket", async function () {
    try {
      const { total, subtotal } = await calcTotal(INITIAL_USER.uid);
      expect(total).toEqual(subtotal);
      expect(total).toBe(0);
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });
});

describe("calcTotal: no offer", function () {
  const reference = admin
    .firestore()
    .collection(Collections.baskets)
    .doc(INITIAL_USER.uid)
    .collection(Collections.products);

  const productsIDs = [
    Object.keys(TEST_PRODUCTS)[0],
    Object.keys(TEST_PRODUCTS)[3],
  ];

  const data: BasketProduct[] = [
    {
      productID: productsIDs[0],
      price: TEST_PRODUCTS[productsIDs[0]].price,
      count: 2,
    },
    {
      productID: productsIDs[1],
      price: TEST_PRODUCTS[productsIDs[1]].price,
      count: 3,
    },
  ];

  beforeAll(async function () {
    //  add test basket products
    const batch = admin.firestore().batch();

    data.forEach((item) => {
      batch.set(reference.doc(item.productID), item);
    });

    await batch.commit();
  });

  test("calcTotal", async function () {
    try {
      const { total, subtotal } = await calcTotal(INITIAL_USER.uid);
      expect(subtotal).toBe(total);
      expect(total).toBe(
        data.reduce((summary, { price, count }) => summary + price * count, 0)
      );
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  afterAll(async function () {
    //  delete test basket products
    const batch = admin.firestore().batch();

    data.forEach((item) => {
      batch.delete(reference.doc(item.productID));
    });

    await batch.commit();
  });
});

describe("calcTotal: discount type offer", function () {
  const reference = admin
    .firestore()
    .collection(Collections.baskets)
    .doc(INITIAL_USER.uid)
    .collection(Collections.products);

  const { productID, offerID } = OFFER_KEYS[0]; // discount type offer

  const data: BasketProduct[] = [
    {
      productID,
      price: TEST_PRODUCTS[productID].price,
      count: 2,
      offerID,
    },
  ];

  beforeAll(async function () {
    //  add test basket products
    const batch = admin.firestore().batch();

    data.forEach((item) => {
      batch.set(reference.doc(item.productID), item);
    });

    await batch.commit();
  });

  test("calc few apples", async function () {
    try {
      const { total, subtotal } = await calcTotal(INITIAL_USER.uid);
      expect(total).toBeLessThan(subtotal);
      expect(subtotal).toBe(
        data.reduce((summary, { price, count }) => summary + price * count, 0)
      );
      expect(total).toBe(subtotal * (1 - TEST_OFFERS[offerID].value));
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  afterAll(async function () {
    //  delete test basket products
    const batch = admin.firestore().batch();

    data.forEach((item) => {
      batch.delete(reference.doc(item.productID));
    });

    await batch.commit();
  });
});

describe("calcTotal: group type offer", function () {
  const reference = admin
    .firestore()
    .collection(Collections.baskets)
    .doc(INITIAL_USER.uid)
    .collection(Collections.products);

  const { productID, offerID } = OFFER_KEYS[1]; // discount type offer

  const bread: BasketProduct = {
    productID,
    price: TEST_PRODUCTS[productID].price,
    count: 1,
    offerID,
  };

  const soup: BasketProduct = {
    productID: "soup",
    price: TEST_PRODUCTS.soup.price,
    count: 2,
  };

  beforeAll(async function () {
    //  add test basket products
    const batch = admin.firestore().batch();

    batch.set(reference.doc(bread.productID), bread);
    batch.set(reference.doc(soup.productID), soup);

    await batch.commit();
  });

  test("test valid case", async function () {
    try {
      const { total, subtotal } = await calcTotal(INITIAL_USER.uid);
      expect(total).toBeLessThan(subtotal);
      expect(total).toBe(
        soup.price * soup.count + bread.price * TEST_OFFERS[offerID].value
      );
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  test("test 2 bread with 2 soups", async function () {
    bread.count = 2;
    await reference.doc(bread.productID).set(bread); // set 2 breads

    const { total } = await calcTotal(INITIAL_USER.uid);

    // it is should calculate 1.5 of bread.
    expect(total).toBe(
      soup.price * soup.count +
        bread.price * TEST_OFFERS[offerID].value +
        bread.price
    );
  });

  test("no enough soup", async function () {
    soup.count = 1;
    await reference.doc(soup.productID).set(soup); // set only 1 soup
    const { total } = await calcTotal(INITIAL_USER.uid);

    // it is should be 2 breads + and 1 soup
    expect(total).toBe(bread.price * bread.count + soup.price * soup.count);
  });

  afterAll(async function () {
    //  delete test basket products
    const batch = admin.firestore().batch();

    batch.delete(reference.doc(bread.productID));
    batch.delete(reference.doc(soup.productID));

    await batch.commit();
  });
});
