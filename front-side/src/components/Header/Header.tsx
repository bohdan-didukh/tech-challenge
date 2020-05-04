import { auth } from "firebase";
import React from "react";

import { Basket } from "./Basket";

import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const user = auth().currentUser;
  return (
    <header>
      {user && <Basket />}
      <h2 className={styles.title}>
        Baskets challenge
        <span className={styles.line}>|</span>
        <a
          href="https://github.com/bohdan-didukh/tech-challenge"
          target="__blank"
          className={styles.link}
        >
          GitHub
        </a>
      </h2>
    </header>
  );
};
