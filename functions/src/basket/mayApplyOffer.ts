import * as admin from "firebase-admin";
import { OfferData, OfferTypes } from "../../../types/products";

/**
 * return the number of how many times we may apply this offer
 * for example, we may buy only one loaf(with -50%) of bread when we have 2 soups in the basket
 * @param offer
 * @param basketProducts
 */
export function mayApplyOffer(
  basketProducts: admin.firestore.DocumentSnapshot[],
  offer?: admin.firestore.DocumentSnapshot
) {
  if (!offer) {
    return 0;
  }

  const { type, products } = offer.data() as OfferData;

  if (type === OfferTypes.discount) {
    return Infinity;
  }

  if (type === OfferTypes.group && products) {
    const timesByProduct = Object.entries(products).reduce(
      (result: number[], [productID, { count }]) => [
        ...result,
        Math.floor(
          (basketProducts.find((doc) => doc.id === productID)?.get("count") ||
            0) / count
        ),
      ],
      []
    );

    // return how many times we may apply the offer checking by selected item
    return Math.min(...timesByProduct);
  }

  return 0;
}
