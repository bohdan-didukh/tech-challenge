import React from "react";
import styles from "./Header.module.css";
export const Header: React.FC = () => (
  <header>
    <h2 className={styles.title}>
      Baskets challenge
      <a
        href="https://github.com/bohdan-didukh/tech-challenge"
        target="__blank"
        className={styles.link}
      >
        <span className={styles.line}>|</span>
        GitHub
      </a>
    </h2>
  </header>
);
