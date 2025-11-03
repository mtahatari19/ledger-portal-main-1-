import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';

import {
  CurrencyType,
  CurrencyTypeListResponse,
  CreateCurrencyTypeRequest,
  UpdateCurrencyTypeRequest,
} from './currency-type.models';

@Injectable({
  providedIn: 'root',
})
export class CurrencyTypeService {
  private httpClient = inject(HttpClient);
  private environment = inject<Environment>(ENVIRONMENT);
  private baseUrl = `${this.environment.baseUrl}/api/v1/currency-types`;

  getCurrencyTypes(page: number = 0, size: number = 20): Observable<CurrencyTypeListResponse> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.httpClient.get<CurrencyTypeListResponse>(this.baseUrl, { params });
  }

  getCurrencyTypeById(id: number): Observable<CurrencyType> {
    return this.httpClient.get<CurrencyType>(`${this.baseUrl}/${id}`);
  }

  createCurrencyType(request: CreateCurrencyTypeRequest): Observable<CurrencyType> {
    return this.httpClient.post<CurrencyType>(this.baseUrl, request);
  }

  updateCurrencyType(id: number, request: UpdateCurrencyTypeRequest): Observable<CurrencyType> {
    return this.httpClient.put<CurrencyType>(`${this.baseUrl}/${id}`, request);
  }

  deleteCurrencyType(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
