import { Route } from '@angular/router';

import { AccountingRelationTypeListComponent } from './accounting-relation-type-list.component';
import { AccountingRelationTypeAddComponent } from './accounting-relation-type-add.component';
import { AccountingRelationTypeEditComponent } from './accounting-relation-type-edit.component';

export const accountingRelationTypeRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: AccountingRelationTypeListComponent,
    data: { breadcrumbTitle: 'لیست' },
  },
  {
    path: 'add',
    component: AccountingRelationTypeAddComponent,
    data: { breadcrumbTitle: 'افزودن' },
  },
  {
    path: 'edit/:id',
    component: AccountingRelationTypeEditComponent,
    data: { breadcrumbTitle: 'ویرایش' },
  },
];

