import React, { useEffect, useMemo, useState } from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";

import styles from "./Basket.module.css";

import { BasketIcon } from "../../../icons";
import { onBasketProductsSnapshot } from "../../../actions/onBasketProductsSnapshot";

export const Basket: React.FC = () => {
  const [basketProducts, setBasketProducts] = useState<DocumentSnapshot[]>([]);

  const totalProducts = useMemo<number>(
    () => basketProducts.reduce((count, doc) => count + doc.get("count"), 0),
    [basketProducts]
  );

  const hidden = useMemo(() => totalProducts === 0, [totalProducts]);

  useEffect(() => {
    onBasketProductsSnapshot((snapshot) => setBasketProducts(snapshot.docs));
  }, []);

  return (
    <div className={`${styles.basket} ${hidden ? styles.hidden : ""}`}>
      <BasketIcon className={styles.icon} />
      <div className={styles.value}>{totalProducts}</div>
    </div>
  );
};
