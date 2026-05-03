import { Gem, Heart, Menu, Search, ShoppingBag } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  favoriteCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

/**
 * 渲染网站顶部导航与全局搜索
 * @param props 导航统计与搜索回调
 * @returns 顶部导航组件
 */
export function Header({
  cartCount,
  favoriteCount,
  searchTerm,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="site-header">
      <button className="icon-button mobile-menu" type="button" aria-label="打开菜单">
        <Menu size={20} />
      </button>

      <a className="brand" href="/" aria-label="Aurora 金饰精品首页">
        <span className="brand-mark">
          <Gem size={22} />
        </span>
        <span>
          <strong>Aurora</strong>
          <small>Fine Gold</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="主导航">
        <a href="#collections">系列</a>
        <a href="#products">金饰</a>
        <a href="#craft">工艺</a>
        <a href="#service">服务</a>
      </nav>

      <label className="search-box" htmlFor="product-search">
        <Search size={18} />
        <input
          id="product-search"
          value={searchTerm}
          type="search"
          placeholder="搜索古法、戒指、礼赠..."
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="header-actions">
        <button className="icon-button" type="button" aria-label={`收藏 ${favoriteCount} 件`}>
          <Heart size={19} />
          <span>{favoriteCount}</span>
        </button>
        <button className="icon-button bag-button" type="button" aria-label={`购物车 ${cartCount} 件`}>
          <ShoppingBag size={19} />
          <span>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
