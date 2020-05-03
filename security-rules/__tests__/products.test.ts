import { apps, assertFails, assertSucceeds } from "@firebase/testing";
import { authedApp, clearData, getAdmin, loadRules, USER } from "./config";
import { CollectionName, Collections, ProductData } from "../../types";

export const PRODUCT: {
  id: string;
  data: ProductData;
} = {
  id: "apple",
  data: {
    name: "Apples",
    price: 1,
    type: "bag",
  },
};

const CollectionProducts: CollectionName = Collections.products;

describe(`test ${CollectionProducts} collection`, function () {
  beforeAll(async function () {
    await loadRules();
  });

  test("user should not be able to create a product", async function () {
    const auth = authedApp();
    await assertFails(
      auth
        .firestore()
        .collection(CollectionProducts)
        .doc(PRODUCT.id)
        .set(PRODUCT.data)
    );
  });

  test("create product with admin access", async function () {
    const admin = getAdmin();
    const reference = admin
      .firestore()
      .collection(CollectionProducts)
      .doc(PRODUCT.id);

    await reference.set(PRODUCT.data);

    const doc = await reference.get();

    // document should be added
    expect(doc.exists).toBeTruthy();
  });

  test("user should be able to get a product", async function () {
    const user = authedApp(USER);
    const reference = user
      .firestore()
      .collection(CollectionProducts)
      .doc(PRODUCT.id);

    const doc = await assertSucceeds(reference.get());
    expect(doc.data()).toEqual(PRODUCT.data);
  });

  test("user should be able to read the whole list of products", async function () {
    const user = authedApp(USER);
    const reference = user.firestore().collection(CollectionProducts);
    await assertSucceeds(reference.get());
  });

  test("user should not be able to delete a product", async function () {
    const user = authedApp(USER);
    const reference = user
      .firestore()
      .collection(CollectionProducts)
      .doc(PRODUCT.id);
    await assertFails(reference.delete());
  });

  afterAll(async function () {
    await clearData();
    await Promise.all(apps().map((app) => app.delete()));
  });
});
