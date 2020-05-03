export const enum Collections {
  products = "products",
  baskets = "baskets",
  offers = "offers",
}

export type CollectionName = keyof typeof Collections;
