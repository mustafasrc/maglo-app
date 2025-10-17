import currency from "currency.js";

interface FormatCurrencyOptions {
  locale?: string;        // Örn: "tr-TR", "en-US"
  symbol?: string;        // Örn: "₺", "$", "€"
  precision?: number;     // Ondalık basamak sayısı
}

export function formatCurrency(
  amount: number | string,
  { locale = "en-US", symbol = "$", precision = 2 }: FormatCurrencyOptions = {}
) {
  return currency(amount, {
    symbol,
    precision,
    separator: locale === "tr-TR" ? "." : ",",
    decimal: locale === "tr-TR" ? "," : ".",
  }).format();
}
