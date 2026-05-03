export type ProductCategory = "necklace" | "ring" | "bracelet" | "earring";

export type ProductOccasion = "daily" | "wedding" | "gift" | "heritage";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  occasion: ProductOccasion;
  material: string;
  price: number;
  image: string;
  badge: string;
  weight: string;
  tone: string;
  description: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
