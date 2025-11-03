import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';

import {
  AccountingRelationType,
  AccountingRelationTypeListResponse,
  CreateAccountingRelationTypeRequest,
  UpdateAccountingRelationTypeRequest,
} from './accounting-relation-type.models';

@Injectable({
  providedIn: 'root',
})
export class AccountingRelationTypeService {
  private httpClient = inject(HttpClient);
  private environment = inject<Environment>(ENVIRONMENT);
  private baseUrl = `${this.environment.baseUrl}/api/v1/accounting-relation-types`;

  getAccountingRelationTypes(page: number = 0, size: number = 20): Observable<AccountingRelationTypeListResponse> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.httpClient.get<AccountingRelationTypeListResponse>(this.baseUrl, { params });
  }

  getAccountingRelationTypeById(id: number): Observable<AccountingRelationType> {
    return this.httpClient.get<AccountingRelationType>(`${this.baseUrl}/${id}`);
  }

  createAccountingRelationType(request: CreateAccountingRelationTypeRequest): Observable<AccountingRelationType> {
    return this.httpClient.post<AccountingRelationType>(this.baseUrl, request);
  }

  updateAccountingRelationType(
    id: number,
    request: UpdateAccountingRelationTypeRequest
  ): Observable<AccountingRelationType> {
    return this.httpClient.put<AccountingRelationType>(`${this.baseUrl}/${id}`, request);
  }

  deleteAccountingRelationType(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
