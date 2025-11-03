import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';

import {
  AccountGroup,
  AccountGroupListResponse,
  CreateAccountGroupRequest,
  UpdateAccountGroupRequest,
} from './account-group.models';

@Injectable({
  providedIn: 'root',
})
export class AccountGroupService {
  private httpClient = inject(HttpClient);
  private environment = inject<Environment>(ENVIRONMENT);
  private baseUrl = `${this.environment.baseUrl}/api/v1/account-groups`;

  getAccountGroups(page: number = 0, size: number = 20): Observable<AccountGroupListResponse> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.httpClient.get<AccountGroupListResponse>(this.baseUrl, { params });
  }

  getAccountGroupById(id: number): Observable<AccountGroup> {
    return this.httpClient.get<AccountGroup>(`${this.baseUrl}/${id}`);
  }

  createAccountGroup(request: CreateAccountGroupRequest): Observable<AccountGroup> {
    return this.httpClient.post<AccountGroup>(this.baseUrl, request);
  }

  updateAccountGroup(id: number, request: UpdateAccountGroupRequest): Observable<AccountGroup> {
    return this.httpClient.put<AccountGroup>(`${this.baseUrl}/${id}`, request);
  }

  deleteAccountGroup(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
