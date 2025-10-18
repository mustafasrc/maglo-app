
export interface FinancialSummaryResponse {
    success: boolean;
    message: string;
    data: FinancialData;
}

export interface FinancialData {
    totalBalance: FinancialItem;
    totalExpense: FinancialItem;
    totalSavings: FinancialItem;
    lastUpdated: string;
}

export interface FinancialItem {
    amount: number;
    currency: string;
    change: FinancialChange;
}

export interface FinancialChange {
    percentage: number;
    trend: "up" | "down";
}
