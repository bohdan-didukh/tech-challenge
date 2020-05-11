import * as functions from "firebase-functions";
import { https } from "firebase-functions";
import { calcTotal } from "./calcTotal";

export const getTotal = functions.https.onCall((data, { auth }) => {
  if (!auth || !auth.uid) {
    throw new https.HttpsError("invalid-argument", "{uid} is not valid");
  }

  return calcTotal(auth.uid);
});
