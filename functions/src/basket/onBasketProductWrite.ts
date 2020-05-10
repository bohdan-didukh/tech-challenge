import * as functions from "firebase-functions";
import { BasketData, Collections } from "../../../types";

export const onBasketProductWrite = functions.firestore
  .document(`${Collections.baskets}/userID/${Collections.products}/productID`)
  .onWrite(({ before, after }, context) => {
    const data = (before.data() as BasketData) || undefined;
    console.log("data is:", data);
    return true;
  });
