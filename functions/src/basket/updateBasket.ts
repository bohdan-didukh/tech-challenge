import * as admin from "firebase-admin";
import { BasketData, Collections } from "../../../types";
import { https } from "firebase-functions";

/**
 * Update basket item for the selected user.
 * @param uid
 * @param data
 */
export async function updateBasket(uid: string, data: BasketData) {
  if (data) {
    throw new https.HttpsError("invalid-argument", "{uid} is not valid");
  }
  return admin.firestore().collection(Collections.baskets).doc(uid).set(data);
}
