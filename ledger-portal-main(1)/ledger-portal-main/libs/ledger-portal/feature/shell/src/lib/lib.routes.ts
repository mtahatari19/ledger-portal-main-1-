import { Route } from '@angular/router';

import { LedgerPortalMasterComponent } from './containers/ledger-portal-master/ledger-portal-master.component';

export const backOfficeFeatureShellRoutes: Route[] = [
  {
    path: '',
    component: LedgerPortalMasterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('@ledger-portal/back-office/feature/home').then(m => m.homeRoutes),
        data: { breadcrumbTitle: 'داشبورد' },
      },
      {
        path: 'basic-information',
        loadChildren: () => import('@ledger-portal/feature/basic-information').then(m => m.basicInformationRoutes),
        data: { breadcrumbTitle: 'اطلاعات پایه' },
      },
      {
        path: 'account-group',
        loadChildren: () => import('@ledger-portal/feature/account-group').then(m => m.accountGroupRoutes),
        data: { breadcrumbTitle: 'گروه حساب' },
      },
      {
        path: 'account-type',
        loadChildren: () => import('@ledger-portal/feature/account-type').then(m => m.accountTypeRoutes),
        data: { breadcrumbTitle: 'نوع حساب' },
      },
      {
        path: 'accounting-relation-type',
        loadChildren: () => import('@ledger-portal/feature/accounting-relation-type').then(m => m.accountingRelationTypeRoutes),
        data: { breadcrumbTitle: 'نوع رابطه حسابداری' },
      },
      {
        path: 'currency',
        loadChildren: () => import('@ledger-portal/feature/currency').then(m => m.currencyRoutes),
        data: { breadcrumbTitle: 'ارز' },
      },
      {
        path: 'currency-type',
        loadChildren: () => import('@ledger-portal/feature/currency-type').then(m => m.currencyTypeRoutes),
        data: { breadcrumbTitle: 'نوع ارز' },
      },
      // accounting-relation-type is available under basic-information routes
      {
        path: 'product',
        loadChildren: () => import('@ledger-portal/feature/product').then(m => m.productRoutes),
        data: { breadcrumbTitle: 'محصول' },
      },
    ],
  },
];
