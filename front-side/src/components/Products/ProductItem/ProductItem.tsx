import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DocumentSnapshot } from "@firebase/firestore-types";

import styles from "./Product.module.scss";
import { OfferData, ProductData } from "../../../../../types/products";
import { CartAdd } from "../../../icons";
import { addProductToBasket } from "../../../actions/addProductToBasket";
import { toDollars } from "../../../helpers";
import { ROUTER } from "../../../constants/routes";
import { fetchProductOffers } from "../../../actions/fetchProductOffers";
import { Offer } from "./Offers";

export interface IProductItem {
  product: DocumentSnapshot;
}
export const ProductItem: React.FC<IProductItem> = ({ product }) => {
  const [hidden, setHidden] = useState(styles.hidden);
  const history = useHistory();
  const { image, name, type, price } = product.data() as ProductData;
  const [offer, setOffer] = useState<DocumentSnapshot<OfferData> | undefined>(
    undefined
  );

  const handleClick = () => {
    history.replace(ROUTER.home);
    return addProductToBasket(product as DocumentSnapshot<ProductData>, offer);
  };

  useEffect(() => {
    fetchProductOffers(product.id).then((snapshot) => {
      if (snapshot.size > 0) {
        setOffer(snapshot.docs[0] as DocumentSnapshot<OfferData>);
      }
    });
  }, [product.id]);

  /**
   * animate product on did mount
   */
  useEffect(() => {
    setTimeout(() => setHidden(""), 10);
  }, []);

  return (
    <button className={`${styles.product} ${hidden}`} onClick={handleClick}>
      {offer && <Offer offer={offer} className={styles.offer} />}
      <img src={image} alt={name} className={styles.image} loading="lazy" />
      <h3 className={styles.name}>{name}</h3>
      <h4 className={styles.add}>
        <span className={styles.type}>per {type}</span>
        <strong className={styles.price}>${toDollars(price)}</strong>
        <CartAdd className={styles.cart} />
      </h4>
    </button>
  );
};
