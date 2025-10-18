import currency from "currency.js";

interface FormatCurrencyOptions {
  currency?: string;
  precision?: number;
}

export function formatCurrency(
  amount: number | string,
  { currency: curr = "$", precision = 2 }: FormatCurrencyOptions = {}
) {
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
