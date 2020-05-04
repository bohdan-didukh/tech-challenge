import { CollectionName } from "../../../types";
import { firestore } from "firebase";

const ProductsCollection: CollectionName = "products";
export function fetchSingleProduct(productID: string) {
  return firestore().collection(ProductsCollection).doc(productID).get();
}
