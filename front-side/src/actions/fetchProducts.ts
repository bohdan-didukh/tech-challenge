import { firestore } from "firebase";
import { CollectionName } from "../../../types";

const ProductsCollection: CollectionName = "products";
export const fetchProducts = () =>
  firestore().collection(ProductsCollection).get();
