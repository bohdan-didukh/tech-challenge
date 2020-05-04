import React from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";

import styles from "./Product.module.scss";
import { ProductData } from "../../../../../types/products";
import { CartAdd } from "../../../icons";
import { addProductToBucket } from "../../../actions/addProductToBucket";
import { toDollars } from "../../../helpers";

export interface IProductItem {
  product: DocumentSnapshot;
}
export const ProductItem: React.FC<IProductItem> = ({ product }) => {
  const { image, name, type, price } = product.data() as ProductData;

  const handleClick = () =>
    addProductToBucket(product as DocumentSnapshot<ProductData>);

  return (
    <button className={styles.product} onClick={handleClick}>
      <img src={image} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <h4 className={styles.add}>
        <span className={styles.type}>per {type}</span>
        <strong className={styles.price}>${toDollars(price)}</strong>
        <CartAdd className={styles.cart} />
      </h4>
    </button>
  );
};
