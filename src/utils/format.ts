/**
 * 格式化人民币金额
 * @param value 金额数值
 * @returns 人民币格式字符串
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(value);
}
