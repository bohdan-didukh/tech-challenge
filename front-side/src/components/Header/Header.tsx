import * as firebase from "firebase/app";
import "firebase/auth";

import React from "react";
import { Link } from "react-router-dom";

import { Basket } from "./Basket";

import styles from "./Header.module.css";
import { ROUTER } from "../../constants/routes";

export const Header: React.FC = () => {
  const user = firebase.auth().currentUser;
  return (
    <header className={styles.header}>
      {user && <Basket />}
      <h2 className={styles.title}>
        <Link to={ROUTER.home} replace={true} className={styles.link}>
          Baskets challenge
        </Link>
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
