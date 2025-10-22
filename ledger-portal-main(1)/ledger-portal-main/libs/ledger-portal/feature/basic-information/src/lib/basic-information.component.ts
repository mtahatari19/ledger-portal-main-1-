import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';

export interface InformationCard {
  id: string;
  title: string;
  totalCount: number;
  activeCount: number;
  listRoute: string;
  addRoute: string;
}

@Component({
  selector: 'ledger-portal-basic-information',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    RouterModule,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './basic-information.component.html',
  styleUrl: './basic-information.component.scss',
})
export class BasicInformationComponent {
  informationCards: InformationCard[] = [
    {
      id: 'account-group',
      title: 'گروه حساب',
      totalCount: 5,
      activeCount: 4,
      listRoute: '/console/account-group/list',
      addRoute: '/console/account-group/add',
    },
    {
      id: 'product-type',
      title: 'نوع محصول',
      totalCount: 5,
      activeCount: 4,
      listRoute: '/console/basic-information/product-type',
      addRoute: '/console/basic-information/product-type/add',
    },
    {
      id: 'products',
      title: 'محصولات',
      totalCount: 2,
      activeCount: 2,
      listRoute: '/console/product/list',
      addRoute: '/console/product/add',
    },
    {
      id: 'currency-type',
      title: 'نوع ارز',
      totalCount: 2,
      activeCount: 1,
      listRoute: '/console/currency-type/list',
      addRoute: '/console/currency-type/add',
    },
    {
      id: 'account-type',
      title: 'نوع حساب',
      totalCount: 4,
      activeCount: 3,
      listRoute: '/console/account-type/add',
      addRoute: '/console/account-type/add',
    },
    {
      id: 'currency',
      title: 'ارز',
      totalCount: 4,
      activeCount: 2,
      listRoute: '/console/currency/list',
      addRoute: '/console/currency/add',
    },
    {
      id: 'accounting-relationship-type',
      title: 'نوع رابطه حسابداری',
      totalCount: 4,
      activeCount: 3,
      listRoute: '/console/accounting-relation-type/list',
      addRoute: '/console/accounting-relation-type/add',
    },
  ];

  getProgressPercentage(activeCount: number, totalCount: number): number {
    return totalCount > 0 ? (activeCount / totalCount) * 100 : 0;
  }
}
