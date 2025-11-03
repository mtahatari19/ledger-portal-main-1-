import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';

import { Currency, CurrencyListResponse, CreateCurrencyRequest, UpdateCurrencyRequest } from './currency.models';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private httpClient = inject(HttpClient);
  private environment = inject<Environment>(ENVIRONMENT);
  private baseUrl = `${this.environment.baseUrl}/api/v1/currencies`;

  getCurrencies(page: number = 0, size: number = 20): Observable<CurrencyListResponse> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.httpClient.get<CurrencyListResponse>(this.baseUrl, { params });
  }

  getCurrencyById(id: number): Observable<Currency> {
    return this.httpClient.get<Currency>(`${this.baseUrl}/${id}`);
  }

  createCurrency(request: CreateCurrencyRequest): Observable<Currency> {
    return this.httpClient.post<Currency>(this.baseUrl, request);
  }

  updateCurrency(id: number, request: UpdateCurrencyRequest): Observable<Currency> {
    return this.httpClient.put<Currency>(`${this.baseUrl}/${id}`, request);
  }

  deleteCurrency(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
