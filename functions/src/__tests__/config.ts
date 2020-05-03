import * as TestFunctions from "firebase-functions-test";

export const firebaseConfig = {
  apiKey: "AIzaSyCB4okRAmpAWX65zF9Rt7yPNI3-MBVXkgI",
  authDomain: "basket-challenge.firebaseapp.com",
  databaseURL: "https://basket-challenge.firebaseio.com",
  projectId: "basket-challenge",
  storageBucket: "basket-challenge.appspot.com",
  messagingSenderId: "12868088025",
  appId: "1:12868088025:web:6e9592fe7bb35bd1adcec8",
};

export const testFunctions = TestFunctions(
  firebaseConfig,
  "src/__tests__/serviceAccountKey.json"
);

test("at least one test", () => {
  expect(testFunctions).toBeDefined();
});
