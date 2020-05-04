import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { DocumentSnapshot } from "@firebase/firestore-types";
import { ProductItem } from "./ProductItem";

import styles from "./Products.module.css";
import { fetchProducts } from "../../actions/fetchProducts";
import { ROUTER } from "../../constants/routes";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<DocumentSnapshot[]>([]);

  const match = useRouteMatch(`/${ROUTER.home}`);

  useEffect(() => {
    fetchProducts().then((snapshot) => setProducts(snapshot.docs));
  }, []);

  const hidden = !match;

  return (
    <div className={`${styles.products} ${hidden ? styles.hidden : ""}`}>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};
