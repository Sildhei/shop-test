export function formatCurrency(amount: number) {
  const parsed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return parsed.replace(/,/g, ".");
}
