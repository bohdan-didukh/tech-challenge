import * as React from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";

import styles from "./BasketItem.module.scss";

import { BasketProduct, OfferData, ProductData } from "../../../../../types";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../../actions/fetchSingleProduct";
import { Times } from "../../../icons/Times";
import { removeProductFromBasket } from "../../../actions/removeProductFromBasket";
import { toDollars } from "../../../helpers";
import { fetchOffer } from "../../../actions/fetchOffer";

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

  const [offer, setOffer] = useState<DocumentSnapshot<OfferData> | undefined>(
    undefined
  );

  const offerID = basketProduct.get("offer");

  useEffect(() => {
    if (basketProduct.exists) {
      fetchSingleProduct(basketProduct.id).then((snap) =>
        setProduct(snap as DocumentSnapshot<ProductData>)
      );

      if (offerID) {
        fetchOffer(basketProduct.id, offerID).then((snap) =>
          setOffer(snap as DocumentSnapshot<OfferData>)
        );
      }
    }
  }, [basketProduct.exists, basketProduct.id, offerID]);

  if (!basketProduct.exists || !product?.exists) return null;

  const { image, name, ...productData } = product.data() as ProductData;

  // price without discount
  let price = productData.price;

  const hasDiscount = offer?.get("type") === "discount";

  if (hasDiscount) {
    price = price * (1 - offer?.get("value"));
  }

  const count = basketProduct.get("count");
  const handleRemove = () => {
    return removeProductFromBasket(product, count, offer);
  };

  return (
    <div
      className={`${styles.item} ${hidden ? "" : styles.visible}`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <img src={image} alt={name} className={styles.image} />
      <span className={styles.name}>{name}</span>
      <span className={styles.count}>{count}</span>
      <strong
        className={`${styles.price} ${hasDiscount ? styles.discount : ""}`}
      >
        ${toDollars(count * price)}
      </strong>
      <button onClick={handleRemove}>
        <Times className={styles.remove} />
      </button>
    </div>
  );
};
