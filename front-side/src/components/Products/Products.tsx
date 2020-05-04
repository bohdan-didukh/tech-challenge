import React, { useEffect, useState } from "react";
import { firestore } from "firebase";
import { DocumentSnapshot } from "@firebase/firestore-types";
import { ProductItem } from "./ProductItem";

import "./Products.css";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<DocumentSnapshot[]>([]);

  useEffect(() => {
    firestore()
      .collection("products")
      .get()
      .then((snapshot) => setProducts(snapshot.docs));
  }, []);

  return (
    <div className="products">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};
