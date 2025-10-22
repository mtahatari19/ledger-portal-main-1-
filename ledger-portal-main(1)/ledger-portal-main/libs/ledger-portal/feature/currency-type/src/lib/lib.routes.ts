import { Route } from '@angular/router';

import { CurrencyTypeListComponent } from './currency-type-list.component';
import { CurrencyTypeAddComponent } from './currency-type-add.component';
import { CurrencyTypeEditComponent } from './currency-type-edit.component';

export const currencyTypeRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: CurrencyTypeListComponent, data: { breadcrumbTitle: 'ارزها' } },
  { path: 'add', component: CurrencyTypeAddComponent, data: { breadcrumbTitle: 'ایجاد نوع ارز' } },
  { path: 'edit/:id', component: CurrencyTypeEditComponent, data: { breadcrumbTitle: 'ویرایش نوع ارز' } },
];


