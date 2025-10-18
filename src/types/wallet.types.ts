export interface Wallet {
  id: string;
  name: string;
  type: "credit" | "debit";
  cardNumber: string;
  bank: string;
  network: string;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
}

export interface WalletCardsData {
  cards: Wallet[];
}

export interface WalletCardsResponse {
  success: boolean;
  message: string;
  data: WalletCardsData;
}

