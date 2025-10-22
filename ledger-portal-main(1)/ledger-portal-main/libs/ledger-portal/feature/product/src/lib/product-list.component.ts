import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

export interface Product {
  id: string;
  code: string;
  name: string;
  englishName: string;
  productType: string;
  description: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'ledger-portal-product-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    LedgerPortalSharedUiBreadcrumbComponent,
    MatTooltip,
    SvgIconTypeDirective,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['code', 'name', 'englishName', 'productType', 'description', 'status', 'actions'];

  dataSource: Product[] = [
    {
      id: '1',
      code: '1001',
      name: 'یارانه کالایی',
      englishName: 'Commodity Subsidy',
      productType: 'خرید اعتباری',
      description: 'محصول یارانه کالایی',
      status: 'active',
    },
    {
      id: '2',
      code: '1002',
      name: 'طرح یسنا',
      englishName: 'Yasna Plan',
      productType: 'خرید اعتباری',
      description: 'طرح یسنا برای خرید اعتباری',
      status: 'active',
    },
    {
      id: '3',
      code: '1003',
      name: 'وام قرض الحسنه',
      englishName: 'Interest-Free Loan',
      productType: 'وام',
      description: 'وام قرض الحسنه',
      status: 'inactive',
    },
  ];

  searchForm = this.fb.group({
    searchTerm: [''],
  });

  filteredDataSource: Product[] = [];

  ngOnInit(): void {
    this.filteredDataSource = [...this.dataSource];

    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.filterData(value ?? '');
    });
  }

  filterData(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredDataSource = [...this.dataSource];
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    this.filteredDataSource = this.dataSource.filter(
      item =>
        item.code.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.englishName.toLowerCase().includes(term) ||
        item.productType.toLowerCase().includes(term)
    );
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value ?? '';
    this.filterData(searchTerm);
  }

  onClearSearch(): void {
    this.searchForm.get('searchTerm')?.setValue('');
    this.filteredDataSource = [...this.dataSource];
  }

  onCreateNew(): void {
    this.router.navigate(['/console/product/add']);
  }

  onEdit(product: Product): void {
    this.router.navigate(['/console/product/edit', product.id]);
  }

  onDelete(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف محصول',
        message: `آیا از حذف محصول "${product.name}" اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter(item => item.id !== product.id);
        this.filteredDataSource = [...this.dataSource];
      }
    });
  }

  getStatusClass(status: 'active' | 'inactive'): string {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-warn-100 text-warn-800';
  }

  getStatusText(status: 'active' | 'inactive'): string {
    return status === 'active' ? 'فعال' : 'غیر فعال';
  }
}

