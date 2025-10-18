import currency from "currency.js";

interface FormatCurrencyOptions {
  currency?: string;   // "TRY", "$", "USD" vb.
  precision?: number;  // Ondalık hane sayısı
}

export function formatCurrency(
  amount: number | string,
  { currency: curr = "$", precision = 2 }: FormatCurrencyOptions = {}
) {
  // Otomatik locale ve symbol belirle
  let symbol = "$";
  let separator = ",";
  let decimal = ".";

  if (curr === "TRY") {
    symbol = "₺";
    separator = ".";
    decimal = ",";
  } else if (curr === "$" || curr === "USD") {
    symbol = "$";
    separator = ",";
    decimal = ".";
  }

  return currency(amount, {
    symbol,
    precision,
    separator,
    decimal,
  }).format();
}
