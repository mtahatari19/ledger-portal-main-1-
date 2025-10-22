import { Routes } from '@angular/router';

export const backOfficeRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@ledger-portal/back-office/feature/auth').then(m => m.backOfficeFeatureAuthRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('@ledger-portal/back-office/feature/auth').then(m => m.backOfficeFeatureAuthRoutes),
  },
  {
    path: 'console',
    loadChildren: () => import('@ledger-portal/back-office/feature/shell').then(m => m.backOfficeFeatureShellRoutes),
  },
  // {
  //   path: 'navigate',
  //   loadChildren: () => import('@ledger-portal/back-office/feature/navigate').then(m => m.navigateRoutes),
  // },
];
