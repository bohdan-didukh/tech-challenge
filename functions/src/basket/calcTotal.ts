import { BasketData, BasketProduct, Collections } from "../../../types";
import { https } from "firebase-functions";
import { mayApplyOffer } from "./mayApplyOffer";
import { getOffer } from "../products";
import { getAdmin } from "../initializeAdmin";

const admin = getAdmin();
/**
 * calculate total and subtotal values for the selected user.
 * @param uid
 */
export async function calcTotal(uid: string) {
  if (!uid) {
    throw new https.HttpsError("invalid-argument", "{uid} is not valid");
  }

  const { docs: basketProducts } = await admin
    .firestore()
    .collection(Collections.baskets)
    .doc(uid)
    .collection(Collections.products)
    .get();

  const offers = await Promise.all(
    basketProducts
      .map(
        (doc) =>
          doc.get("offerID") &&
          getOffer(doc.get("productID"), doc.get("offerID"))
      )
      .filter((promise) => !!promise)
  );

  return basketProducts.reduce(
    (
      { total, subtotal, offers: appliedOffers, ...props }: BasketData,
      basketProduct
    ) => {
      const { price, count, offerID } = basketProduct.data() as BasketProduct;
      const offer = offers.find(
        (offerDoc) => offerDoc.exists && offerDoc.id === offerID
      );

      const mayApplyTimes = mayApplyOffer(basketProducts, offer);

      const discount = offer
        ? Math.min(count, mayApplyTimes) * price * offer.get("value")
        : 0;

      if (offer) {
        appliedOffers.push({
          name: offer.get("name"),
          discount: discount,
        });
      }

      return {
        subtotal: subtotal + price * count,
        total: total + price * count - discount,
        offers: appliedOffers,
        ...props,
      };
    },
    {
      subtotal: 0,
      total: 0,
      offers: [],
      updated: admin.firestore.Timestamp.now(),
    }
  );
}
