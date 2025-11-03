import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';

import { Product, ProductListResponse, CreateProductRequest, UpdateProductRequest } from './product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private environment = inject<Environment>(ENVIRONMENT);
  private baseUrl = `${this.environment.baseUrl}/api/v1/products`;

  getProducts(page: number = 0, size: number = 20): Observable<ProductListResponse> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.httpClient.get<ProductListResponse>(this.baseUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(request: CreateProductRequest): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, request);
  }

  updateProduct(id: number, request: UpdateProductRequest): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/${id}`, request);
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
