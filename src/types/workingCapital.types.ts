export interface WorkingCapitalItem {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export interface WorkingCapitalSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}


export interface WorkingCapitalData {
  period: string; // örn: "last6Months"
  currency: string;
  data: WorkingCapitalItem[];
  summary: WorkingCapitalSummary;
}


export interface WorkingCapitalResponse {
  success: boolean;
  message: string;
  data: WorkingCapitalData;
}
