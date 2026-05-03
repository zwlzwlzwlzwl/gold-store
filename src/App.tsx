import { CartSummary } from "./components/cart-summary";
import { CollectionStrip } from "./components/collection-strip";
import { FilterPanel } from "./components/filter-panel";
import { Header } from "./components/header";
import { ProductGrid } from "./components/product-grid";
import { ProductSpotlight } from "./components/product-spotlight";
import { useProductExplorer } from "./hooks/use-product-explorer";

/**
 * 渲染金饰精品购物网站
 * @returns 应用根组件
 */
export default function App() {
  const {
    addToCart,
    cartItems,
    decreaseCartItem,
    favoriteIds,
    filteredProducts,
    searchTerm,
    selectedCategory,
    selectedOccasion,
    selectedProduct,
    setSearchTerm,
    setSelectedCategory,
    setSelectedOccasion,
    setSelectedProduct,
    toggleFavorite,
    totalCartCount,
    totalCartPrice,
  } = useProductExplorer();

  return (
    <div className="app-shell">
      <Header
        cartCount={totalCartCount}
        favoriteCount={favoriteIds.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main>
        <ProductSpotlight product={selectedProduct} onAddToCart={addToCart} />
        <CollectionStrip />

        <section className="shopping-layout" id="products" aria-label="金饰商品">
          <div className="section-heading">
            <p className="eyebrow">Shop by desire</p>
            <h2>按场景、工艺与色泽挑选</h2>
            <span>{filteredProducts.length} 件金饰可选</span>
          </div>

          <div className="catalog-layout">
            <FilterPanel
              selectedCategory={selectedCategory}
              selectedOccasion={selectedOccasion}
              onCategoryChange={setSelectedCategory}
              onOccasionChange={setSelectedOccasion}
            />

            <ProductGrid
              favoriteIds={favoriteIds}
              products={filteredProducts}
              selectedProductId={selectedProduct.id}
              onAddToCart={addToCart}
              onSelect={setSelectedProduct}
              onToggleFavorite={toggleFavorite}
            />

            <CartSummary
              cartItems={cartItems}
              totalCartPrice={totalCartPrice}
              onAddToCart={addToCart}
              onDecreaseCartItem={decreaseCartItem}
            />
          </div>
        </section>

        <section className="craft-band" id="craft" aria-label="工艺服务">
          <div>
            <p className="eyebrow">Maison service</p>
            <h2>从金价确认到礼盒交付，全程可追溯</h2>
          </div>
          <p>
            每件商品保留材质、克重、工艺与证书信息，支持到店试戴、线上顾问复核尺寸、
            周年保养提醒与礼赠日期预约。
          </p>
        </section>
      </main>

      <footer className="site-footer" id="service">
        <span>Aurora Fine Gold</span>
        <span>透明金价 · 国检证书 · 终身保养档案</span>
      </footer>
    </div>
  );
}
