import { BasketTotal, Collections } from "../../../types";
import * as admin from "firebase-admin";
import { https } from "firebase-functions";

admin.initializeApp();

export async function calcTotal(uid: string): Promise<BasketTotal> {
  if (!uid) {
    throw new https.HttpsError("invalid-argument", "{uid} is not valid");
  }
  const items = await admin
    .firestore()
    .collection(Collections.baskets)
    .doc(uid)
    .collection(Collections.products)
    .get();

  if (!items.size) {
    return { total: 0 };
  }

  const products = await Promise.all(
    items.docs.map((doc) => {
      return admin
        .firestore()
        .collection(Collections.products)
        .doc(doc.get("productID"))
        .get();
    })
  );

  const total = products.reduce((amount, product) => {
    if (product) {
      const item = items.docs.find(
        (doc) => doc.get("productID") === product.id
      );
      if (item) {
        return amount + product.get("price") * item.get("count");
      }
    }
    return amount;
  }, 0);

  return { total };
}
