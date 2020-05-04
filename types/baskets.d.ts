import {
  DocumentReference,
  FieldValue,
  Timestamp,
} from "@firebase/firestore-types";

export interface BasketProduct {
  timestamp: Timestamp | FieldValue;
  productID: string;
  count: number | FieldValue;
  offer?: DocumentReference;
}

export interface BasketData {
  updated: Timestamp | FieldValue;
  total?: number | FieldValue;
}

export interface BasketTotal {
  total: number;
}
