import { auth, firestore } from "firebase";
import { QuerySnapshot } from "@firebase/firestore-types";

import { CollectionName } from "../../../types";

const BasketsCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export function onBasketProductsSnapshot(
  update: (snapshot: QuerySnapshot) => any
) {
  const user = auth().currentUser;

  if (!user) {
    throw new Error("user is unauthenticated");
  }

  const reference = firestore()
    .collection(BasketsCollection)
    .doc(user.uid)
    .collection(ProductsCollection);

  return reference.onSnapshot(update);
}
