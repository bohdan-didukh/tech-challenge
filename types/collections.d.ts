export const enum Collections {
  products = "products",
  baskets = "baskets",
}

export type CollectionName = keyof typeof Collections;
