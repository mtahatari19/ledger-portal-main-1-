import { Route } from '@angular/router';
import { LedgerPortalFeatureAuthLoginPageComponent } from './containers/ledger-portal-feature-auth-login-page/ledger-portal-feature-auth-login-page.component';

export const backOfficeFeatureAuthRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LedgerPortalFeatureAuthLoginPageComponent,
  },
];
