import * as functions from "firebase-functions";

import { BasketTotal } from "../../../types";
import { calcTotal } from "./calcTotal";

export const getTotal = functions.https.onCall(
  async (data: any, { auth }): Promise<BasketTotal> => {
    if (!auth?.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is unauthenticated"
      );
    }

    return calcTotal(auth.uid);
  }
);
