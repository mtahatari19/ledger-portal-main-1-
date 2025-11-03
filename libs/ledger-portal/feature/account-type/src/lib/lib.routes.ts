import { Route } from '@angular/router';

import { AccountTypeComponent } from './account-type/account-type.component';

export const accountTypeRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'add',
  },
  {
    path: 'add',
    component: AccountTypeComponent,
    data: { breadcrumbTitle: 'افزودن نوع حساب' },
  },
  {
    path: 'edit/:id',
    component: AccountTypeComponent,
    data: { breadcrumbTitle: 'ویرایش نوع حساب' },
  },
];
