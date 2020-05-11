import { Timestamp } from "@firebase/firestore-types";

export const enum OfferTypes {
  discount = "discount",
  group = "group",
}

export type OfferType = keyof typeof OfferTypes;

export interface OfferProduct {
  count: number;
  image: string;
}
export interface OfferData {
  name: string;
  type: OfferType;
  value: number; // value in % from 0 to 1
  products?: { [key: string]: OfferProduct };
  start?: Timestamp;
  end?: Timestamp;
}
