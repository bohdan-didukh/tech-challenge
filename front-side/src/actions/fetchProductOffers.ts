import * as firebase from "firebase/app";
import "firebase/firestore";
import { CollectionName } from "../../../types";

const ProductsCollection: CollectionName = "products";
const OffersCollection: CollectionName = "offers";

/**
 * there we need to make a query according to the business logic.
 * @param productID
 */
export const fetchProductOffers = (productID: string) =>
  firebase
    .firestore()
    .collection(ProductsCollection)
    .doc(productID)
    .collection(OffersCollection)
    .get();
