import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { QuerySnapshot } from "@firebase/firestore-types";

import styles from "./Basket.module.css";

import { BasketIcon } from "../../../icons";
import { BasketProduct } from "../../../../../types";
import { ROUTER } from "../../../constants/routes";
import { onBasketProductsSnapshot } from "../../../actions/onBasketProductsSnapshot";

export const Basket: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch(`/${ROUTER.basket}`);

  const [basketProducts, setBasketProducts] = useState<QuerySnapshot<
    BasketProduct
  > | null>(null);

  useEffect(() => {
    onBasketProductsSnapshot((data) => setBasketProducts(data));
  }, []);

  const count =
    basketProducts?.docs.reduce(
      (totalCount, doc) => doc.get("count") + totalCount,
      0
    ) || 0;
  const hidden = useMemo(() => count === 0, [count]);

  useEffect(() => {
    if (hidden && match) {
      history.replace(ROUTER.home);
    }
  }, [hidden, history, match]);

  return (
    <Link
      className={`${styles.basket} ${hidden ? styles.hidden : ""}`}
      to={ROUTER.basket}
      replace={true}
    >
      <BasketIcon className={styles.icon} />
      <div className={styles.value}>{count}</div>
    </Link>
  );
};
