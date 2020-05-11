import { Collections } from "../../../types";
import { getAdmin } from "../initializeAdmin";

const admin = getAdmin();

export function getOffer(productID: string, offerID: string) {
  return admin
    .firestore()
    .collection(Collections.products)
    .doc(productID)
    .collection(Collections.offers)
    .doc(offerID)
    .get();
}
