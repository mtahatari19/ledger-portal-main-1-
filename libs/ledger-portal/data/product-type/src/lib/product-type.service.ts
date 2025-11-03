import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';

import {
  ProductType,
  ProductTypeListResponse,
  CreateProductTypeRequest,
  UpdateProductTypeRequest,
} from './product-type.models';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  private httpClient = inject(HttpClient);
  private environment = inject<Environment>(ENVIRONMENT);
  private baseUrl = `${this.environment.baseUrl}/api/v1/product-types`;

  getProductTypes(page: number = 0, size: number = 20): Observable<ProductTypeListResponse> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.httpClient.get<ProductTypeListResponse>(this.baseUrl, { params });
  }

  getProductTypeById(id: number): Observable<ProductType> {
    return this.httpClient.get<ProductType>(`${this.baseUrl}/${id}`);
  }

  createProductType(request: CreateProductTypeRequest): Observable<ProductType> {
    return this.httpClient.post<ProductType>(this.baseUrl, request);
  }

  updateProductType(id: number, request: UpdateProductTypeRequest): Observable<ProductType> {
    return this.httpClient.put<ProductType>(`${this.baseUrl}/${id}`, request);
  }

  deleteProductType(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
