import { DocumentReference, DocumentSnapshot } from "@firebase/firestore-types";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { OfferData, ProductData } from "../../../types/products";
import { BasketProduct, CollectionName } from "../../../types";
import { updateBasket } from "./updateBasket";

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

  let price = product.get("price");

  if (offer && offer.exists) {
    const { type, value } = offer.data() as OfferData;
    if (type === "discount") {
      price = Math.round(product.get("price") * (1 - value));
    }
  }

  const data: BasketProduct = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    productID: product.id,
    count: firebase.firestore.FieldValue.increment(1),
  };

  if (offer) {
    data.offer = offer.id;
  }

  const reference = firebase
    .firestore()
    .collection(BasketCollection)
    .doc(user.uid)
    .collection(ProductsCollection)
    .doc(product.id) as DocumentReference<BasketProduct>;

  const batch = firebase.firestore().batch();
  batch.set<BasketProduct>(reference, data, { merge: true });
  updateBasket(price, batch);

  return batch.commit();
};
