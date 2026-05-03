import { ArrowUpRight, Crown, Gift, ScrollText } from "lucide-react";

const collections = [
  {
    icon: Crown,
    title: "新中式传承",
    text: "古法金、珐琅与纹样工艺，适合收藏与节庆佩戴。",
  },
  {
    icon: Gift,
    title: "纪念日礼赠",
    text: "按关系与预算组合礼盒，让心意更准确地落在细节里。",
  },
  {
    icon: ScrollText,
    title: "婚嫁金饰",
    text: "从订婚戒到成套金饰，统一色泽与仪式感。",
  },
];

/**
 * 渲染重点系列入口
 * @returns 系列导购组件
 */
export function CollectionStrip() {
  return (
    <section className="collection-strip" id="collections" aria-label="金饰系列">
      {collections.map((collection) => {
        const Icon = collection.icon;

        return (
          <article key={collection.title}>
            <Icon size={22} />
            <div>
              <h2>{collection.title}</h2>
              <p>{collection.text}</p>
            </div>
            <a href="#products" aria-label={`浏览${collection.title}`}>
              <ArrowUpRight size={18} />
            </a>
          </article>
        );
      })}
    </section>
  );
}
