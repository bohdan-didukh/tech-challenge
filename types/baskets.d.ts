import { FieldValue, Timestamp } from "@firebase/firestore-types";

export interface BasketProduct {
  timestamp?: Timestamp | FieldValue;
  productID: string;
  count: number;
  price: number; // it is price value in the time of buying
  offerID?: string; // offerID value
}

export interface BasketData {
  updated: Timestamp | FieldValue;
  total: number; // Field value is for increment function
  subtotal: number;
  offers: Array<{
    name: string;
    discount: number;
  }>;
}
