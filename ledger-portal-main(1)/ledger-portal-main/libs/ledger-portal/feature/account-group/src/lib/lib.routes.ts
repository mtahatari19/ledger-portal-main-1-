import { Route } from '@angular/router';

import { AccountGroupAddComponent } from './account-group-add.component';
import { AccountGroupEditComponent } from './account-group-edit.component';
import { AccountGroupListComponent } from './account-group-list.component';

export const accountGroupRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: AccountGroupListComponent,
    data: { breadcrumbTitle: 'لیست' },
  },
  {
    path: 'add',
    component: AccountGroupAddComponent,
    data: { breadcrumbTitle: 'افزودن' },
  },
  {
    path: 'edit/:id',
    component: AccountGroupEditComponent,
    data: { breadcrumbTitle: 'ویرایش' },
  },
];
