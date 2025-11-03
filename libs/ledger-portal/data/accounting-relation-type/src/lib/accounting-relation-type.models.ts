export interface AccountingRelationType {
  id: number;
  accountingRelationCode: string;
  persianTitle: string;
  englishTitle: string;
  subsystem: string;
  productType: string;
  summary: string | null;
  status: string;
  statusLabel: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

///// Test
export interface CreateAccountingRelationTypeRequest {
  accountingRelationCode: string;
  persianTitle: string;
  englishTitle: string;
  subsystem: string;
  productType: string;
  summary: string;
}

export interface UpdateAccountingRelationTypeRequest {
  accountingRelationCode: string;
  persianTitle: string;
  englishTitle: string;
  subsystem: string;
  productType: string;
  summary: string;
  status: string;
}

export type AccountingRelationTypeListResponse = AccountingRelationType[];
