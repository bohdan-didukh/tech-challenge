import React, { useEffect, useState } from "react";
import { initializeApp, auth, User } from "firebase";
import "firebase/auth";

import { Header } from "./components/Header";

import "./App.css";

import { FIREBASE_CONFIG } from "./constants";
import { Products } from "./components/Products";

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // Initialize Firebase
    initializeApp(FIREBASE_CONFIG);

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
            <Products />
          </>
        )}
      </main>
    </div>
  );
};
