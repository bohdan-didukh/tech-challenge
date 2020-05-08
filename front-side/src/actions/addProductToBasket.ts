import { DocumentReference, DocumentSnapshot } from "@firebase/firestore-types";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { ProductData } from "../../../types/products";
import { BasketProduct, CollectionName } from "../../../types";
import { updateBasket } from "./updateBasket";

const BasketCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export const addProductToBasket = (product: DocumentSnapshot<ProductData>) => {
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error("user is undefined");
  }

  const data: BasketProduct = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    productID: product.id,
    count: firebase.firestore.FieldValue.increment(1),
  };
  const reference = firebase
    .firestore()
    .collection(BasketCollection)
    .doc(user.uid)
    .collection(ProductsCollection)
    .doc(product.id) as DocumentReference<BasketProduct>;

  const batch = firebase.firestore().batch();
  batch.set<BasketProduct>(reference, data, { merge: true });
  updateBasket(product.get("price"), batch);

  return batch.commit();
};
