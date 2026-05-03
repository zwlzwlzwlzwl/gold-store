import { BadgeCheck, CircleDollarSign, SlidersHorizontal, Sparkle } from "lucide-react";
import { categoryLabels, occasionLabels } from "../data/products";
import type { ProductCategory, ProductOccasion } from "../types/product";

type FilterValue = "all";

interface FilterPanelProps {
  selectedCategory: ProductCategory | FilterValue;
  selectedOccasion: ProductOccasion | FilterValue;
  onCategoryChange: (value: ProductCategory | FilterValue) => void;
  onOccasionChange: (value: ProductOccasion | FilterValue) => void;
}

const categoryOptions: Array<{ value: ProductCategory | FilterValue; label: string }> = [
  { value: "all", label: "全部品类" },
  { value: "necklace", label: categoryLabels.necklace },
  { value: "ring", label: categoryLabels.ring },
  { value: "bracelet", label: categoryLabels.bracelet },
  { value: "earring", label: categoryLabels.earring },
];

const occasionOptions: Array<{ value: ProductOccasion | FilterValue; label: string }> = [
  { value: "all", label: "全部场景" },
  { value: "daily", label: occasionLabels.daily },
  { value: "wedding", label: occasionLabels.wedding },
  { value: "gift", label: occasionLabels.gift },
  { value: "heritage", label: occasionLabels.heritage },
];

/**
 * 渲染商品筛选与购买保障信息
 * @param props 筛选状态与变更回调
 * @returns 筛选面板组件
 */
export function FilterPanel({
  selectedCategory,
  selectedOccasion,
  onCategoryChange,
  onOccasionChange,
}: FilterPanelProps) {
  return (
    <aside className="filter-panel" aria-label="商品筛选">
      <div className="panel-title">
        <SlidersHorizontal size={18} />
        <span>精准挑选</span>
      </div>

      <fieldset>
        <legend>品类</legend>
        <div className="segmented-list">
          {categoryOptions.map((option) => (
            <button
              className={selectedCategory === option.value ? "is-active" : ""}
              key={option.value}
              type="button"
              onClick={() => onCategoryChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>佩戴场景</legend>
        <div className="segmented-list">
          {occasionOptions.map((option) => (
            <button
              className={selectedOccasion === option.value ? "is-active" : ""}
              key={option.value}
              type="button"
              onClick={() => onOccasionChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="service-notes">
        <div>
          <BadgeCheck size={18} />
          <span>国检证书随单</span>
        </div>
        <div>
          <Sparkle size={18} />
          <span>免费刻字与保养</span>
        </div>
        <div>
          <CircleDollarSign size={18} />
          <span>按实时金价透明计价</span>
        </div>
      </div>
    </aside>
  );
}
