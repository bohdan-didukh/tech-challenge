import { FieldValue, Timestamp } from "@firebase/firestore-types";

export interface BasketProduct {
  timestamp: Timestamp | FieldValue;
  productID: string;
  count: number | FieldValue;
  price: number; // it is price value in the time of buying
  offerID?: string; // offerID value
  discount: number; // it is a value from 0 to 1. Where the 1 means no discount: price * discount == price
}

export interface BasketData {
  updated: Timestamp | FieldValue;
  total?: number | FieldValue; // Field value is for increment function
}
