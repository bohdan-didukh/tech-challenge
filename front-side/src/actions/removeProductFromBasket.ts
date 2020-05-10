import { DocumentReference, DocumentSnapshot } from "@firebase/firestore-types";
import { BasketProduct, CollectionName, ProductData } from "../../../types";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const BasketCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export const removeProductFromBasket = (
  product: DocumentSnapshot<ProductData>
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

  return reference.delete();
};
