import { DocumentSnapshot } from "@firebase/firestore-types";
import { ProductData } from "../../../types/products";
import { BasketProduct, CollectionName } from "../../../types";
import { auth, firestore } from "firebase";

const BasketCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export const addProductToBucket = (product: DocumentSnapshot<ProductData>) => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error("user is undefined");
  }

  const data: BasketProduct = {
    timestamp: firestore.FieldValue.serverTimestamp(),
    productID: product.id,
    count: firestore.FieldValue.increment(1),
  };
  const reference = firestore()
    .collection(BasketCollection)
    .doc(user.uid)
    .collection(ProductsCollection)
    .doc(product.id);

  return reference.set(data, { merge: true });
};
