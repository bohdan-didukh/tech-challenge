import React, { useEffect, useMemo, useState } from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";

import styles from "./Basket.module.css";

import { BasketIcon } from "../../../icons";
import { BasketData } from "../../../../../types";
import { onBasketSnapshot } from "../../../actions/onBasketSnapshot";
import { toDollars } from "../../../helpers";

export const Basket: React.FC = () => {
  const [basket, setBasket] = useState<DocumentSnapshot<BasketData> | null>(
    null
  );

  const total = basket?.get("total") | 0;
  const hidden = useMemo(() => total === 0, [total]);

  useEffect(() => {
    onBasketSnapshot(setBasket);
  }, []);

  return (
    <div className={`${styles.basket} ${hidden ? styles.hidden : ""}`}>
      <BasketIcon className={styles.icon} />
      <div className={styles.value}>${toDollars(total)}</div>
    </div>
  );
};
