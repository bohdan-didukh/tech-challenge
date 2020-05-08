import { DocumentReference, DocumentSnapshot } from "@firebase/firestore-types";
import {
  BasketProduct,
  CollectionName,
  OfferData,
  ProductData,
} from "../../../types";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { updateBasket } from "./updateBasket";

const BasketCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export const removeProductFromBasket = (
  product: DocumentSnapshot<ProductData>,
  count: number,
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

  const reference = firebase
    .firestore()
    .collection(BasketCollection)
    .doc(user.uid)
    .collection(ProductsCollection)
    .doc(product.id) as DocumentReference<BasketProduct>;

  const batch = firebase.firestore().batch();
  batch.delete(reference);
  updateBasket(-price * count, batch);
  return batch.commit();
};
