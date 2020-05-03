import { DocumentReference, Timestamp } from "@firebase/firestore-types";

export interface BasketProduct {
  timestamp: Timestamp;
  productID: string;
  count: number;
  offer?: DocumentReference;
}

export interface BasketData {
  updated: Timestamp;
  total?: number;
}
