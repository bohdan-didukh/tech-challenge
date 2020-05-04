import React from "react";
import styles from "./Header.module.css";
export const Header: React.FC = () => (
  <header>
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
