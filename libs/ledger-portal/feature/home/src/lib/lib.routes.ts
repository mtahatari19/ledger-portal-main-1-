import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';

import { NgxEchartsModule } from 'ngx-echarts';

import { LedgerPortalFeatureHomeComponent } from './page/ledger-portal-feature-home.component';

export const homeRoutes: Route[] = [
  {
    providers: [
      importProvidersFrom(
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        })
      ),
    ],
    path: '',
    component: LedgerPortalFeatureHomeComponent,
  },
];
