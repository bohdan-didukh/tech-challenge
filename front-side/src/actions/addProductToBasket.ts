import { DocumentReference, DocumentSnapshot } from "@firebase/firestore-types";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { OfferData, ProductData } from "../../../types/products";
import { BasketProduct, CollectionName } from "../../../types";

const BasketCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export const addProductToBasket = (
  product: DocumentSnapshot<ProductData>,
  offer?: DocumentSnapshot<OfferData>
) => {
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error("user is undefined");
  }

  const data: BasketProduct = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    productID: product.id,
    count: (firebase.firestore.FieldValue.increment(1) as unknown) as number,
    price: product.get("price"),
  };

  if (offer) {
    data.offerID = offer.id;
  }

  const reference = firebase
    .firestore()
    .collection(BasketCollection)
    .doc(user.uid)
    .collection(ProductsCollection)
    .doc(product.id) as DocumentReference<BasketProduct>;

  return reference.set(data, { merge: true });
};
