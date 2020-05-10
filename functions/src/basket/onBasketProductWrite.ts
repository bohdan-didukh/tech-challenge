import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { Collections } from "../../../types";
import { calcTotal } from "./calcTotal";
import { updateBasket } from "./updateBasket";

export const onBasketProductWrite = functions.firestore
  .document(`${Collections.baskets}/uid/${Collections.products}/productID`)
  .onWrite(async ({ after }, context) => {
    const { uid } = context.params;
    return (
      uid &&
      updateBasket(uid, {
        ...(await calcTotal(uid)),
        updated: admin.firestore.FieldValue.serverTimestamp(),
      })
    );
  });
