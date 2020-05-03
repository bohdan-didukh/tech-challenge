import { Timestamp } from "@firebase/firestore-types";

export const enum OfferTypes {
  discount = "discount",
}

export type OfferType = keyof typeof OfferTypes;

export interface OfferData {
  type: OfferType;
  value: number;
  start?: Timestamp;
  end?: Timestamp;
}
