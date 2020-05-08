import React, { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { BrowserRouter as Router } from "react-router-dom";

import { Header } from "./components/Header";

import "./App.css";

import { FIREBASE_CONFIG } from "./constants";
import { Products } from "./components/Products";
import { BasketProducts } from "./components/BasketProducts";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);
firebase
  .firestore()
  .enablePersistence()
  .catch(function (err) {
    console.log("error code is:", err.code);
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

export const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    // sign in anonymously
    firebase
      .auth()
      .signInAnonymously()
      .catch(({ code, message }) =>
        console.warn(`error on sign in. ${code} ${message}`)
      );

    // check auth state
    firebase.auth().onAuthStateChanged(setUser);
  }, []);
  return (
    <Router>
      <main>
        <Header />

        {user && (
          <>
            <Products />
            <BasketProducts />
          </>
        )}
      </main>
    </Router>
  );
};
