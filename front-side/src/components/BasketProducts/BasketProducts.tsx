import React, { useEffect, useState } from "react";
import { QuerySnapshot } from "@firebase/firestore-types";
import { useRouteMatch } from "react-router-dom";

import styles from "./BasketProducts.module.scss";

import { BasketData, BasketProduct } from "../../../../types";

import { onBasketProductsSnapshot } from "../../actions/onBasketProductsSnapshot";
import { BasketItem } from "./BasketItem";
import { ROUTER } from "../../constants/routes";
import { getTotal } from "../../actions/getTotal";
import { TotalInfo } from "./TotalInfo";

export const BasketProducts: React.FC = () => {
  const match = useRouteMatch(`/${ROUTER.basket}`);
  const [total, setTotal] = useState<BasketData | null>(null);
  const [basketProducts, setBasketProducts] = useState<QuerySnapshot<
    BasketProduct
  > | null>(null);

  useEffect(() => {
    onBasketProductsSnapshot((data) => setBasketProducts(data));
  }, []);

  const hidden = !match;

  useEffect(() => {
    setTotal(null);

    if (!hidden) {
      // fetch total every time when opening the basket
      getTotal().then(({ data }) => setTotal(data));
    }
  }, [hidden, basketProducts?.size]);

  return (
    <div className={`${styles.products} ${hidden ? styles.hidden : ""}`}>
      {basketProducts?.docs.map((doc, index) => (
        <BasketItem
          basketProduct={doc}
          key={doc.id}
          hidden={hidden}
          index={index}
        />
      ))}
      <TotalInfo data={total} hidden={hidden} />
    </div>
  );
};
