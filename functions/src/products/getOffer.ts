import * as admin from "firebase-admin";
import { Collections } from "../../../types";

export function getOffer(productID: string, offerID: string) {
  return admin
    .firestore()
    .collection(Collections.products)
    .doc(productID)
    .collection(Collections.offers)
    .doc(offerID)
    .get();
}
