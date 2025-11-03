import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';

import { CreateAccountTypeRequest } from './account-type.models';

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService {
  private httpClient = inject(HttpClient);
  private environment = inject<Environment>(ENVIRONMENT);
  private baseUrl = `${this.environment.baseUrl}/api/v1/account-types`;

  createAccountType(request: CreateAccountTypeRequest): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, request);
  }
}

