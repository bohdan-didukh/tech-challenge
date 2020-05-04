import React, { useEffect, useState } from "react";
import { QuerySnapshot } from "@firebase/firestore-types";

import styles from "./BasketProducts.module.scss";

import { BasketProduct } from "../../../../types";

import { onBasketProductsSnapshot } from "../../actions/onBasketProductsSnapshot";
import { BasketItem } from "./BasketItem";

export const BasketProducts: React.FC = () => {
  const [basketProducts, setBasketProducts] = useState<QuerySnapshot<
    BasketProduct
  > | null>(null);

  useEffect(() => {
    onBasketProductsSnapshot(setBasketProducts);
  }, []);

  return (
    <div className={styles.products}>
      {basketProducts?.docs.map((doc) => (
        <BasketItem basketProduct={doc} key={doc.id} />
      ))}
    </div>
  );
};
