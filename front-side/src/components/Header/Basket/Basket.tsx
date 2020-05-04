import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { DocumentSnapshot } from "@firebase/firestore-types";

import styles from "./Basket.module.css";

import { BasketIcon } from "../../../icons";
import { BasketData } from "../../../../../types";
import { onBasketSnapshot } from "../../../actions/onBasketSnapshot";
import { toDollars } from "../../../helpers";
import { ROUTER } from "../../../constants/routes";

export const Basket: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch(`/${ROUTER.basket}`);

  const [basket, setBasket] = useState<DocumentSnapshot<BasketData> | null>(
    null
  );

  const total = basket?.get("total") | 0;
  const hidden = useMemo(() => total === 0, [total]);

  useEffect(() => {
    onBasketSnapshot(setBasket);
  }, []);

  useEffect(() => {
    if (hidden && match) {
      history.replace(ROUTER.home);
    }
  }, [hidden]);

  return (
    <Link
      className={`${styles.basket} ${hidden ? styles.hidden : ""}`}
      to={ROUTER.basket}
      replace={true}
    >
      <BasketIcon className={styles.icon} />
      <div className={styles.value}>${toDollars(total)}</div>
    </Link>
  );
};
