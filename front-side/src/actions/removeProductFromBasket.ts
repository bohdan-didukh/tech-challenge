import { DocumentReference, DocumentSnapshot } from "@firebase/firestore-types";
import { BasketProduct, CollectionName, ProductData } from "../../../types";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { updateBasket } from "./updateBasket";

const BasketCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export const removeProductFromBasket = (
  product: DocumentSnapshot<ProductData>,
  count: number
) => {
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error("user is undefined");
  }

  const reference = firebase
    .firestore()
    .collection(BasketCollection)
    .doc(user.uid)
    .collection(ProductsCollection)
    .doc(product.id) as DocumentReference<BasketProduct>;

  const batch = firebase.firestore().batch();
  batch.delete(reference);
  updateBasket(-product.get("price") * count, batch);
  return batch.commit();
};
