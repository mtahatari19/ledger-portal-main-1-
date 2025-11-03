import { Route } from '@angular/router';

import { AccountGroupAddComponent } from './account-group-add.component';
import { AccountGroupEditComponent } from './account-group-edit.component';
import { AccountGroupListComponent } from './account-group-list.component';
import { AccountGroupViewComponent } from './account-group-view.component';

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
    path: 'view/:id',
    component: AccountGroupViewComponent,
    data: { breadcrumbTitle: 'مشاهده' },
  },
  {
    path: 'edit/:id',
    component: AccountGroupEditComponent,
    data: { breadcrumbTitle: 'ویرایش' },
  },
];
