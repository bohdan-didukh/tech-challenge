import * as React from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";

import styles from "./BasketItem.module.scss";

import { BasketProduct, ProductData } from "../../../../../types";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../../actions/fetchSingleProduct";
import { Times } from "../../../icons/Times";
import { removeProductFromBasket } from "../../../actions/removeProductFromBasket";

export interface IBasketItem {
  basketProduct: DocumentSnapshot<BasketProduct>;
  hidden: boolean;
  index: number;
}

export const BasketItem: React.FC<IBasketItem> = ({
  basketProduct,
  hidden,
  index,
}) => {
  const [product, setProduct] = useState<DocumentSnapshot<ProductData> | null>(
    null
  );

  useEffect(() => {
    if (basketProduct.exists) {
      fetchSingleProduct(basketProduct.id).then((snap) =>
        setProduct(snap as DocumentSnapshot<ProductData>)
      );
    }
  }, []);

  if (!basketProduct.exists || !product?.exists) return null;

  const { image, name, price } = product.data() as ProductData;

  const count = basketProduct.get("count");
  const handleRemove = () => {
    return removeProductFromBasket(product, count);
  };

  return (
    <div
      className={`${styles.item} ${hidden ? "" : styles.visible}`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <img src={image} alt={name} className={styles.image} />
      <span className={styles.name}>{name}</span>
      <span className={styles.count}>{count}</span>
      <strong className={styles.price}>${count * price}</strong>
      <button onClick={handleRemove}>
        <Times className={styles.remove} />
      </button>
    </div>
  );
};
