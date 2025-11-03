export interface CurrencyType {
  id: number;
  currencyTypeCode: string;
  persianName: string;
  englishName: string;
  isoNumericCode: number;
  isoLetterCode: string;
  decimalPrecision: number;
  description: string;
  status: string;
  statusPersianLabel: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CreateCurrencyTypeRequest {
  currencyTypeCode: string;
  persianName: string;
  englishName: string;
  isoNumericCode: number;
  isoLetterCode: string;
  decimalPrecision: number;
  description: string;
  status: string;
}

export interface UpdateCurrencyTypeRequest {
  currencyTypeCode: string;
  persianName: string;
  englishName: string;
  isoNumericCode: number;
  isoLetterCode: string;
  decimalPrecision: number;
  description: string;
  status: string;
}

export type CurrencyTypeListResponse = CurrencyType[];

