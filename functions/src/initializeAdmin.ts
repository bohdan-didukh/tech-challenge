import * as admin from "firebase-admin";

if (process.env.NODE_ENV === "test") {
  // initialize for test environment
  const serviceAccount = require("./__tests__/serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://basket-challenge.firebaseio.com",
  });
} else {
  admin.initializeApp();
}

export const getAdmin = () => admin;
