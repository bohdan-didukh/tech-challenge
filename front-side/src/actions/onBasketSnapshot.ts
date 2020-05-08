import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { BasketData, CollectionName } from "../../../types";
import { DocumentSnapshot } from "@firebase/firestore-types";

const BasketsCollection: CollectionName = "baskets";
export function onBasketSnapshot(
  update: (snapshot: DocumentSnapshot<BasketData>) => any
) {
  const user = firebase.auth().currentUser;
  if (!user) {
    throw new Error("user is unauthenticated");
  }
  return firebase
    .firestore()
    .collection(BasketsCollection)
    .doc(user.uid)
    .onSnapshot((basket) => update(basket as DocumentSnapshot<BasketData>));
}
