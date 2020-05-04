import React, { useEffect, useState } from "react";
import { initializeApp, auth, User } from "firebase";
import "firebase/auth";

import { Header } from "./components/Header";

import "./App.css";

import { FIREBASE_CONFIG } from "./constants";
import { Products } from "./components/Products";
import { BasketProducts } from "./components/BasketProducts";

// Initialize Firebase
initializeApp(FIREBASE_CONFIG);

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // sign in anonymously
    auth()
      .signInAnonymously()
      .catch(({ code, message }) =>
        console.warn(`error on sign in. ${code} ${message}`)
      );

    // check auth state
    auth().onAuthStateChanged(setUser);
  }, []);
  return (
    <div>
      <main>
        <Header />

        {user && (
          <>
            <BasketProducts />
            <Products />
          </>
        )}
      </main>
    </div>
  );
};
