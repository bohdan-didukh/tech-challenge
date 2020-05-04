import React from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";

import styles from "./Product.module.scss";
import { ProductData } from "../../../../../types/products";
import { CartAdd } from "../../../icons";

export interface IProductItem {
  product: DocumentSnapshot;
}
export const ProductItem: React.FC<IProductItem> = ({ product }) => {
  const { image, name, type, price } = product.data() as ProductData;
  return (
    <button className={styles.product}>
      <img src={image} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <h4 className={styles.add}>
        <span className={styles.type}>per {type}</span>
        <strong className={styles.price}>${price}</strong>
        <CartAdd className={styles.cart} />
      </h4>
    </button>
  );
};
