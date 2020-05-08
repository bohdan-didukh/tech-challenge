import React, { useEffect, useState } from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";
import { OfferData, OfferType } from "../../../../../../types/products";

import styles from "./Offer.module.scss";

export interface OfferProps {
  offer: DocumentSnapshot<OfferData>;
  className?: string;
}

const DiscountType: OfferType = "discount";
export const Offer: React.FC<OfferProps> = ({ offer, className = "" }) => {
  const [hidden, setHidden] = useState(styles.hidden);

  /**
   * remove hidden class on did mount
   * we need it for show-in animation
   */
  useEffect(() => {
    setTimeout(() => setHidden(""), 0);
  }, []);
  return (
    <div className={`${styles.offer} ${className} ${hidden}`}>
      {offer.get("type") === DiscountType && (
        <div className={styles.value}>- {offer.get("value") * 100}%</div>
      )}
    </div>
  );
};
