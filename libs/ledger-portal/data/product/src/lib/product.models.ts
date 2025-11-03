export interface Product {
  id: number;
  productCode: string;
  persianProductName: string;
  englishProductName: string;
  productType: string;
  summary: string | null;
  status: string;
  statusLabel: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CreateProductRequest {
  productCode: string;
  persianProductName: string;
  englishProductName: string;
  productType: string;
  summary: string;
}

export interface UpdateProductRequest {
  productCode: string;
  persianProductName: string;
  englishProductName: string;
  productType: string;
  summary: string;
  status: string;
}

export type ProductListResponse = Product[];

