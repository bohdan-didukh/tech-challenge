import { Timestamp } from "@firebase/firestore-types";

export interface BasketData {
  updated: Timestamp;
  products: string[]; //product ids
}
