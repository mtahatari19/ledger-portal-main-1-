import { Route } from '@angular/router';

import { ProductAddComponent } from './product-add.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductListComponent } from './product-list.component';

export const productRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: ProductListComponent,
    data: { breadcrumbTitle: 'لیست' },
  },
  {
    path: 'add',
    component: ProductAddComponent,
    data: { breadcrumbTitle: 'افزودن' },
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
    data: { breadcrumbTitle: 'ویرایش' },
  },
];
