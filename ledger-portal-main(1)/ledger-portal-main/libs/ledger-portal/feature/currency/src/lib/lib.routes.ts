import { Route } from '@angular/router';

import { CurrencyListComponent } from './currency-list.component';
import { CurrencyAddComponent } from './currency-add.component';
import { CurrencyEditComponent } from './currency-edit.component';

export const currencyRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: CurrencyListComponent, data: { breadcrumbTitle: 'لیست' } },
  { path: 'add', component: CurrencyAddComponent, data: { breadcrumbTitle: 'افزودن' } },
  { path: 'edit/:id', component: CurrencyEditComponent, data: { breadcrumbTitle: 'ویرایش' } },
];


