import { useMemo, useState } from "react";
import { products } from "../data/products";
import type { CartItem, Product, ProductCategory, ProductOccasion } from "../types/product";

type FilterValue = "all";

export interface ProductExplorerState {
  cartItems: CartItem[];
  favoriteIds: number[];
  filteredProducts: Product[];
  selectedCategory: ProductCategory | FilterValue;
  selectedOccasion: ProductOccasion | FilterValue;
  selectedProduct: Product;
  totalCartCount: number;
  totalCartPrice: number;
  searchTerm: string;
  addToCart: (product: Product) => void;
  decreaseCartItem: (productId: number) => void;
  setSearchTerm: (value: string) => void;
  setSelectedCategory: (value: ProductCategory | FilterValue) => void;
  setSelectedOccasion: (value: ProductOccasion | FilterValue) => void;
  setSelectedProduct: (product: Product) => void;
  toggleFavorite: (productId: number) => void;
}

/**
 * 管理商品浏览、筛选、收藏和购物车状态
 * @returns 商品浏览所需的派生数据与操作方法
 */
export function useProductExplorer(): ProductExplorerState {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | FilterValue>("all");
  const [selectedOccasion, setSelectedOccasion] = useState<ProductOccasion | FilterValue>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([2, 7]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesOccasion = selectedOccasion === "all" || product.occasion === selectedOccasion;
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        [product.name, product.material, product.description, product.tone]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearchTerm);

      return matchesCategory && matchesOccasion && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedOccasion]);

  const totalCartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const totalCartPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [cartItems],
  );

  /**
   * 添加商品到购物车
   * @param product 目标商品
   */
  function addToCart(product: Product): void {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  }

  /**
   * 减少购物车中指定商品数量
   * @param productId 商品 ID
   */
  function decreaseCartItem(productId: number): void {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  /**
   * 切换商品收藏状态
   * @param productId 商品 ID
   */
  function toggleFavorite(productId: number): void {
    setFavoriteIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((currentId) => currentId !== productId)
        : [...currentIds, productId],
    );
  }

  return {
    cartItems,
    favoriteIds,
    filteredProducts,
    selectedCategory,
    selectedOccasion,
    selectedProduct,
    totalCartCount,
    totalCartPrice,
    searchTerm,
    addToCart,
    decreaseCartItem,
    setSearchTerm,
    setSelectedCategory,
    setSelectedOccasion,
    setSelectedProduct,
    toggleFavorite,
  };
}
