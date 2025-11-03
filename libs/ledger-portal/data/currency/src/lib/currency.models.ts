export interface Currency {
  id: number;
  currencyCode: string;
  currencyNumCode: number;
  swiftCode: string;
  currencyName: string;
  symbol: string;
  decimalPrecision: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CreateCurrencyRequest {
  currencyCode: string;
  currencyNumCode: number;
  swiftCode: string;
  currencyName: string;
  symbol: string;
  decimalPrecision: number;
}

export interface UpdateCurrencyRequest {
  currencyCode: string;
  currencyNumCode: number;
  swiftCode: string;
  currencyName: string;
  symbol: string;
  decimalPrecision: number;
  status: string;
}

export type CurrencyListResponse = Currency[];

