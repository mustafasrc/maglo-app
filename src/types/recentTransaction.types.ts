export interface Transaction {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  count: number;
}

export interface TransactionsData {
  transactions: Transaction[];
  summary: TransactionSummary;
}

export interface TransactionsResponse {
  success: boolean;
  message: string;
  data: TransactionsData;
}