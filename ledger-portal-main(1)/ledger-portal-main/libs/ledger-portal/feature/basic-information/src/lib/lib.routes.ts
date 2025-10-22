import { Route } from '@angular/router';

import { BasicInformationComponent } from './basic-information.component';
import { ProductTypeAddComponent } from './product-type/product-type-add.component';
import { ProductTypeListComponent } from './product-type/product-type-list.component';

export const basicInformationRoutes: Route[] = [
  { path: '', component: BasicInformationComponent },
  {
    path: 'product-type',
    data: { breadcrumbTitle: 'نوع محصول' },
    children: [
      { path: '', component: ProductTypeListComponent },
      { path: 'add', component: ProductTypeAddComponent, data: { breadcrumbTitle: 'افزودن' } },
    ],
  },
];
