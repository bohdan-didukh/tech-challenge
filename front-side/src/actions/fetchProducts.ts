import * as firebase from "firebase/app";
import "firebase/firestore";
import { CollectionName } from "../../../types";

const ProductsCollection: CollectionName = "products";
export const fetchProducts = () =>
  firebase.firestore().collection(ProductsCollection).get();
