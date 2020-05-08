import { BasketData, CollectionName } from "../../../types";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { WriteBatch } from "@firebase/firestore-types";

const BasketsCollection: CollectionName = "baskets";
export function updateBasket(total: number, batch: WriteBatch) {
  const user = firebase.auth().currentUser;

  if (!user) {
    throw new Error("user is unauthenticated");
  }

  const data: BasketData = {
    updated: firebase.firestore.FieldValue.serverTimestamp(),
    total: firebase.firestore.FieldValue.increment(total),
  };

  const reference = firebase
    .firestore()
    .collection(BasketsCollection)
    .doc(user.uid);

  if (batch) {
    batch.set(reference, data, { merge: true });
    return;
  }
  return reference.set(data, { merge: true });
}
