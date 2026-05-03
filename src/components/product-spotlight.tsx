import { ArrowRight, Gem, Ruler, ShieldCheck, ShoppingBag } from "lucide-react";
import { categoryLabels, occasionLabels } from "../data/products";
import type { Product } from "../types/product";
import { formatCurrency } from "../utils/format";

interface ProductSpotlightProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

/**
 * 将商品名拆成主体与品类后缀，避免中文大标题出现单字孤行
 * @param productName 商品名称
 * @returns 标题主体与后缀
 */
function getSpotlightTitleParts(productName: string): { mainTitle: string; suffixTitle: string } {
  const titleSuffixes = ["手镯", "手链", "项链", "戒指", "耳环", "耳坠", "金链"];
  const suffixTitle = titleSuffixes.find((suffix) => productName.endsWith(suffix)) ?? "";

  if (!suffixTitle) {
    return { mainTitle: productName, suffixTitle: "" };
  }

  return {
    mainTitle: productName.slice(0, -suffixTitle.length),
    suffixTitle,
  };
}

/**
 * 渲染重点商品详情区
 * @param props 当前选中商品与加入购物车回调
 * @returns 商品详情组件
 */
export function ProductSpotlight({ product, onAddToCart }: ProductSpotlightProps) {
  const { mainTitle, suffixTitle } = getSpotlightTitleParts(product.name);

  return (
    <section className="spotlight" aria-label="精选商品详情">
      <div className="spotlight-copy">
        <p className="eyebrow">今日精选 · {occasionLabels[product.occasion]}</p>
        <h1>
          <span>{mainTitle}</span>
          {suffixTitle ? <span>{suffixTitle}</span> : null}
        </h1>
        <p className="spotlight-description">{product.description}</p>

        <div className="spotlight-stats">
          <div>
            <Gem size={17} />
            <span>{product.material}</span>
          </div>
          <div>
            <Ruler size={17} />
            <span>{product.weight}</span>
          </div>
          <div>
            <ShieldCheck size={17} />
            <span>库存 {product.stock} 件</span>
          </div>
        </div>

        <div className="spotlight-actions">
          <strong>{formatCurrency(product.price)}</strong>
          <button className="primary-button" type="button" onClick={() => onAddToCart(product)}>
            <ShoppingBag size={18} />
            加入礼盒
          </button>
          <a className="text-link" href="#products">
            继续挑选 <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="spotlight-media">
        <img src={product.image} alt={product.name} />
        <div className="floating-spec">
          <span>{categoryLabels[product.category]}</span>
          <strong>{product.tone}</strong>
        </div>
      </div>
    </section>
  );
}
