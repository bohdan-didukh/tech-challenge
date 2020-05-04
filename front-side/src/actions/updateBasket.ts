import { BasketData, CollectionName } from "../../../types";
import { auth, firestore } from "firebase";
import { WriteBatch } from "@firebase/firestore-types";

const BasketsCollection: CollectionName = "baskets";
export function updateBasket(total: number, batch: WriteBatch) {
  const user = auth().currentUser;

  if (!user) {
    throw new Error("user is unauthenticated");
  }

  const data: BasketData = {
    updated: firestore.FieldValue.serverTimestamp(),
    total: firestore.FieldValue.increment(total),
  };

  const reference = firestore().collection(BasketsCollection).doc(user.uid);

  if (batch) {
    batch.set(reference, data, { merge: true });
    return;
  }
  return reference.set(data, { merge: true });
}
