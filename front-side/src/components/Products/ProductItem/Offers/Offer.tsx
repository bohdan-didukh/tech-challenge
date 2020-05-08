import React, { useEffect, useState } from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";
import { OfferData, OfferType } from "../../../../../../types/products";

import styles from "./Offer.module.scss";
import { Times } from "../../../../icons/Times";

export interface OfferProps {
  offer: DocumentSnapshot<OfferData>;
  className?: string;
}

const GroupType: OfferType = "group";
export const Offer: React.FC<OfferProps> = ({ offer, className = "" }) => {
  const [hidden, setHidden] = useState(styles.hidden);

  /**
   * remove hidden class on did mount
   * we need it for show-in animation
   */
  useEffect(() => {
    setTimeout(() => setHidden(""), 100);
  }, []);

  const { type, value, products } = offer.data() as OfferData;

  return (
    <div className={`${styles.offer} ${className} ${hidden}`}>
      {type === GroupType && products && (
        <>
          {Object.entries(products).map(
            ([productID, { image, count }], index, list) => (
              <span className={styles.product} key={productID}>
                <img src={image} alt={productID} className={styles.image} />
                {count > 1 && (
                  <>
                    <Times className={styles.times} />
                    <span className={styles.operation}>2</span>
                  </>
                )}
                <span className={styles.operation}>
                  {index === list.length - 1 ? "=" : "+"}
                </span>
              </span>
            )
          )}
        </>
      )}
      <div className={styles.value}>- {value * 100}%</div>
    </div>
  );
};
