import * as React from "react";
import { BasketData } from "../../../../../types";

import styles from "./TotalInfo.module.scss";
import { toDollars } from "../../../helpers";
export interface TotalInfoProps {
  data: BasketData | null;
  hidden: boolean;
}
export const TotalInfo: React.FC<TotalInfoProps> = ({ data, hidden }) => (
  <div className={`${styles.totalInfo} ${hidden ? styles.hidden : ""}`}>
    {data && (
      <>
        {data.subtotal !== data.total && !data.offers.length && (
          <div className={styles.item}>
            Subtotal:
            <strong className={styles.value}>
              ${toDollars(data.subtotal)}
            </strong>
          </div>
        )}
        {data.offers.map(({ name, discount }) => (
          <div className={styles.item}>
            {name}:
            <strong className={styles.value}>- ${toDollars(discount)}</strong>
          </div>
        ))}
        <div className={styles.item}>
          Total:
          <strong className={styles.value}>${toDollars(data.total)}</strong>
        </div>
      </>
    )}
  </div>
);
