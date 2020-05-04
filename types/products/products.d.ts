export type ProductType = "bottle" | "bag" | "loaf" | "tin";

export interface ProductData {
  name: string;
  price: number;
  type: ProductType;
  image?: string;
}
