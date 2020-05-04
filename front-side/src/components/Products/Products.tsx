import React, { useEffect, useState } from "react";
import { DocumentSnapshot } from "@firebase/firestore-types";
import { ProductItem } from "./ProductItem";

import "./Products.css";
import { fetchProducts } from "../../actions/fetchProducts";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<DocumentSnapshot[]>([]);

  useEffect(() => {
    fetchProducts().then((snapshot) => setProducts(snapshot.docs));
  }, []);

  return (
    <div className="products">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};
