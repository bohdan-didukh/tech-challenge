import { DocumentReference, DocumentSnapshot } from "@firebase/firestore-types";
import { BasketProduct, CollectionName, ProductData } from "../../../types";
import { auth, firestore } from "firebase";
import { updateBasket } from "./updateBasket";

const BasketCollection: CollectionName = "baskets";
const ProductsCollection: CollectionName = "products";

export const removeProductFromBasket = (
  product: DocumentSnapshot<ProductData>,
  count: number
) => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error("user is undefined");
  }

  const reference = firestore()
    .collection(BasketCollection)
    .doc(user.uid)
    .collection(ProductsCollection)
    .doc(product.id) as DocumentReference<BasketProduct>;

  const batch = firestore().batch();
  batch.delete(reference);
  updateBasket(-product.get("price") * count, batch);
  return batch.commit();
};
