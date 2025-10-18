export interface ScheduledTransfer {
  id: string;
  name: string;
  image: string;
  date: string; // ISO string
  amount: number;
  currency: string;
  status: "scheduled" | "completed" | "cancelled";
}


export interface ScheduledTransferSummary {
  totalScheduledAmount: number;
  count: number;
}


export interface ScheduledTransfersData {
  transfers: ScheduledTransfer[];
  summary: ScheduledTransferSummary;
}


export interface ScheduledTransfersResponse {
  success: boolean;
  message: string;
  data: ScheduledTransfersData;
}
