import * as firebase from "firebase/app";
import "firebase/firestore";
import { CollectionName } from "../../../types";

const ProductsCollection: CollectionName = "products";
const OffersCollection: CollectionName = "offers";

/**
 * there we need to make a query according to the business logic.
 * @param productID
 * @param offerID
 */
export const fetchOffer = (productID: string, offerID: string) =>
  firebase
    .firestore()
    .collection(ProductsCollection)
    .doc(productID)
    .collection(OffersCollection)
    .doc(offerID)
    .get();
