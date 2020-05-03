export type ProductType = "bottle" | "bag" | "loaf" | "tin";

export interface ProductData {
  name: string;
  price: number;
  type: ProductType;
}

export const enum Collections {
  products = "products",
  baskets = "baskets",
}

export type CollectionName = keyof typeof Collections;
