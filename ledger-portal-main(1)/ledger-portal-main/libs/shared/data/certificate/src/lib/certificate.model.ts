export interface CertificateResponse {
  content: Certificate[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface Certificate {
  certificateId: number;
  code: string;
  product: Product;
  transfers: [
    {
      id: number;
      fromPersonId: number;
      toPersonId: number;
      transferQuantity: number;
      turnNumber: number;
      documentType: string;
      documentNumber: string;
      documentDate: string;
      validatedBy: string;
      status: string;
    },
  ];
  branch: Branch;
  currency: Currency;
  quantity: number;
  unitValue: number;
  totalValue: number;
  durationMonths: number;
  issueDate: string;
  maturityDate: string;
  symbolType: string;
  symbolName: string;
  committedCustomer: Customer | null;
  applicantCustomer: Customer | null;
  guaranteeValue: number;
  settledValue: number;
  unsettledValue: number;
  fees: Fees;
  accounting: Accounting;
  status: Status;
  ownerships: Ownership[];
  createdAt: string;
  createdBy: string;
}

export interface Product {
  id: number;
  code: string;
  title: string;
  description: string;
  mainType: MainType;
  allowedBranches: Branch[];
  allowedCurrencies: Currency[];
  minQuantityPerIssue: number;
  maxQuantityPerIssue: number;
  minDurationMonths: number;
  maxDurationMonths: number;
  valueType: string;
  unitValue: number;
  defaultCurrency: Currency;
  feePolicyCode: string;
  accountingTemplateCode: string;
  issuanceFeeRate: number;
  issuanceFixedFee: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface MainType {
  id: number;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Branch {
  id: number;
  code: number;
  name: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  enabled: boolean;
  decimalPlaces: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  creditLimit: number;
  unsettledValue: number;
}

export interface Fees {
  totalFee: number;
  calculatedFrom: string;
}

export interface Accounting {
  entryId: string;
  status: string;
}

export interface Status {
  code: string;
  statusDate: string;
}

export interface Ownership {
  personId: number;
  nationalId: string;
  firstName: string;
  lastName: string;
  quantity: number;
  turnNumber: number;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}
