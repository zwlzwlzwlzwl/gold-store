import { Heart, Plus, ShoppingBag } from "lucide-react";
import { categoryLabels } from "../data/products";
import type { Product } from "../types/product";
import { formatCurrency } from "../utils/format";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  isSelected: boolean;
  onAddToCart: (product: Product) => void;
  onSelect: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
}

/**
 * 渲染单个商品卡片
 * @param props 商品数据与交互回调
 * @returns 商品卡片组件
 */
export function ProductCard({
  product,
  isFavorite,
  isSelected,
  onAddToCart,
  onSelect,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <article className={`product-card ${isSelected ? "is-selected" : ""}`}>
      <button
        className="product-media"
        type="button"
        onClick={() => onSelect(product)}
        aria-label={`查看 ${product.name}`}
      >
        <img src={product.image} alt={product.name} />
        <span>{product.badge}</span>
      </button>

      <div className="product-info">
        <div>
          <p>{categoryLabels[product.category]} · {product.material}</p>
          <h3>{product.name}</h3>
        </div>

        <button
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          type="button"
          aria-label={isFavorite ? `取消收藏 ${product.name}` : `收藏 ${product.name}`}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-meta">
        <span>{product.weight}</span>
        <span>{product.tone}</span>
      </div>

      <div className="product-footer">
        <strong>{formatCurrency(product.price)}</strong>
        <button
          className="add-button"
          type="button"
          aria-label={`加入购物车 ${product.name}`}
          onClick={() => onAddToCart(product)}
        >
          <Plus size={16} />
          <ShoppingBag size={16} />
        </button>
      </div>
    </article>
  );
}
