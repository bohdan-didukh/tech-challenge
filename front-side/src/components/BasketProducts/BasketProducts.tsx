import React, { useEffect, useState } from "react";
import { QuerySnapshot } from "@firebase/firestore-types";
import { useRouteMatch } from "react-router-dom";

import styles from "./BasketProducts.module.scss";

import { BasketProduct } from "../../../../types";

import { onBasketProductsSnapshot } from "../../actions/onBasketProductsSnapshot";
import { BasketItem } from "./BasketItem";
import { ROUTER } from "../../constants/routes";

export const BasketProducts: React.FC = () => {
  const match = useRouteMatch(`/${ROUTER.basket}`);
  const [basketProducts, setBasketProducts] = useState<QuerySnapshot<
    BasketProduct
  > | null>(null);

  useEffect(() => {
    onBasketProductsSnapshot((data) => setBasketProducts(data));
  }, []);

  const hidden = !match;

  return (
    <div className={styles.products}>
      {basketProducts?.docs.map((doc, index) => (
        <BasketItem
          basketProduct={doc}
          key={doc.id}
          hidden={hidden}
          index={index}
        />
      ))}
    </div>
  );
};
