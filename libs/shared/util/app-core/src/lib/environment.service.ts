import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private readonly environment = inject(ENVIRONMENT);

  get baseUrl(): string {
    return this.environment.baseUrl;
  }

  get apiPath(): string {
    return this.environment.apiPath;
  }

  get apiRoot(): string {
    return this.environment.apiRoot;
  }

  get isProduction(): boolean {
    return this.environment.production;
  }
}
