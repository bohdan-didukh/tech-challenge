import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { QuerySnapshot } from "@firebase/firestore-types";

import { BasketProduct, CollectionName } from "../../../types";

const BasketsCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export function onBasketProductsSnapshot(
  update: (snapshot: QuerySnapshot<BasketProduct>) => any
) {
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error("user is unauthenticated");
  }

  const reference = firebase
    .firestore()
    .collection(BasketsCollection)
    .doc(user.uid)
    .collection(ProductsCollection);

  return reference.onSnapshot((snap) =>
    update(snap as QuerySnapshot<BasketProduct>)
  );
}
