import { BasketData, Collections } from "../../../types";
import { https } from "firebase-functions";
import { getAdmin } from "../initializeAdmin";

const admin = getAdmin();
/**
 * Update basket item for the selected user.
 * @param uid
 * @param data
 */

export async function updateBasket(uid: string, data: BasketData) {
  if (!uid) {
    throw new https.HttpsError("invalid-argument", "{uid} is not valid");
  }
  return admin.firestore().collection(Collections.baskets).doc(uid).set(data);
}
