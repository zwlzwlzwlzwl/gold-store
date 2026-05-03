import { Minus, Plus, ReceiptText, Sparkles } from "lucide-react";
import type { CartItem, Product } from "../types/product";
import { formatCurrency } from "../utils/format";

interface CartSummaryProps {
  cartItems: CartItem[];
  totalCartPrice: number;
  onAddToCart: (product: Product) => void;
  onDecreaseCartItem: (productId: number) => void;
}

/**
 * 渲染购物车摘要与结算入口
 * @param props 购物车数据与数量调整回调
 * @returns 购物车摘要组件
 */
export function CartSummary({
  cartItems,
  totalCartPrice,
  onAddToCart,
  onDecreaseCartItem,
}: CartSummaryProps) {
  return (
    <aside className="cart-summary" aria-label="购物车摘要">
      <div className="panel-title">
        <ReceiptText size={18} />
        <span>礼盒清单</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <Sparkles size={25} />
          <p>挑选心仪金饰后，这里会自动生成礼盒清单。</p>
        </div>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <strong>{item.product.name}</strong>
                <span>{formatCurrency(item.product.price)}</span>
              </div>
              <div className="quantity-control" aria-label={`${item.product.name} 数量`}>
                <button
                  type="button"
                  aria-label={`减少 ${item.product.name}`}
                  onClick={() => onDecreaseCartItem(item.product.id)}
                >
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`增加 ${item.product.name}`}
                  onClick={() => onAddToCart(item.product)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        <span>预估合计</span>
        <strong>{formatCurrency(totalCartPrice)}</strong>
      </div>

      <button className="checkout-button" type="button" disabled={cartItems.length === 0}>
        预约顾问确认金价
      </button>
    </aside>
  );
}
