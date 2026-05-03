import { SearchX } from "lucide-react";
import type { Product } from "../types/product";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  favoriteIds: number[];
  products: Product[];
  selectedProductId: number;
  onAddToCart: (product: Product) => void;
  onSelect: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
}

/**
 * 渲染商品列表与空状态
 * @param props 商品列表、收藏状态与交互回调
 * @returns 商品网格组件
 */
export function ProductGrid({
  favoriteIds,
  products,
  selectedProductId,
  onAddToCart,
  onSelect,
  onToggleFavorite,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <SearchX size={34} />
        <h3>暂未找到匹配金饰</h3>
        <p>可以换一个关键词，或放宽品类与场景筛选。</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds.includes(product.id)}
          isSelected={selectedProductId === product.id}
          onAddToCart={onAddToCart}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
