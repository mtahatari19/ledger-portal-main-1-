export interface ProductType {
  id: number;
  productTypeCode: string;
  persianProductTypeName: string;
  englishProductTypeName: string;
  summary: string | null;
  features: string;
  status: string;
  statusLabel: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CreateProductTypeRequest {
  productTypeCode: string;
  persianProductTypeName: string;
  englishProductTypeName: string;
  summary: string;
  features: string;
}

export interface UpdateProductTypeRequest {
  productTypeCode: string;
  persianProductTypeName: string;
  englishProductTypeName: string;
  summary: string;
  features: string;
  status: string;
}

export type ProductTypeListResponse = ProductType[];

