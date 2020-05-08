import { CollectionName } from "../../../types";
import * as firebase from "firebase/app";
import "firebase/firestore";

const ProductsCollection: CollectionName = "products";
export function fetchSingleProduct(productID: string) {
  return firebase
    .firestore()
    .collection(ProductsCollection)
    .doc(productID)
    .get();
}
