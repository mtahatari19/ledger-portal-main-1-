import { Route } from '@angular/router';

import { BasicInformationComponent } from './basic-information.component';
import { ProductTypeAddComponent } from './product-type/product-type-add.component';
import { ProductTypeEditComponent } from './product-type/product-type-edit.component';
import { ProductTypeListComponent } from './product-type/product-type-list.component';
import { ProductTypeViewComponent } from './product-type/product-type-view.component';

export const basicInformationRoutes: Route[] = [
  { path: '', component: BasicInformationComponent },
  {
    path: 'product-type',
    data: { breadcrumbTitle: 'نوع محصول' },
    children: [
      { path: '', component: ProductTypeListComponent },
      { path: 'add', component: ProductTypeAddComponent, data: { breadcrumbTitle: 'افزودن' } },
      { path: 'view/:id', component: ProductTypeViewComponent, data: { breadcrumbTitle: 'مشاهده' } },
      { path: 'edit/:id', component: ProductTypeEditComponent, data: { breadcrumbTitle: 'ویرایش' } },
    ],
  },
];
