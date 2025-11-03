export interface CreateAccountTypeRequest {
  accountTypeCode: string;
  accountingCode1: string;
  accountingCode2: string;
  persianName: string;
  englishName: string;
  accountGroupIds: number[];
  subsystem: string;
  productTypeId: number;
  accountingRelationTypeId: number;
  personType: string;
  subAccount: string;
  description: string;
  status: string;
  currencyType: string;
  selectedCurrencyIds: number[];
  defaultCurrencyId: number;
  unitType: string;
  units: string[];
  defaultUnit: string;
  restrictionType: string;
  relationType: string;
  selectedRestrictionId: number;
  restrictionDescription: string;
}

