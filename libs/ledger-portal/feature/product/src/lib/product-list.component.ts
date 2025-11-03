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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { ProductService, Product } from '@ledger-portal/data/product';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { EmptyStateComponent, ErrorStateComponent } from '@ledger-portal/shared/ui/empty-state';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

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
    MatProgressSpinnerModule,
    LedgerPortalSharedUiBreadcrumbComponent,
    MatTooltip,
    SvgIconTypeDirective,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private productService = inject(ProductService);
  private alert = inject(AlertService);

  displayedColumns: string[] = ['code', 'name', 'englishName', 'productType', 'description', 'status', 'actions'];

  dataSource: Product[] = [];
  isLoading = false;
  hasError = false;

  searchForm = this.fb.group({
    searchTerm: [''],
  });

  filteredDataSource: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();

    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.filterData(value ?? '');
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.hasError = false;
    this.productService.getProducts().subscribe({
      next: products => {
        this.dataSource = products;
        this.filteredDataSource = [...this.dataSource];
        this.isLoading = false;
        this.hasError = false;
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  onRetry(): void {
    this.loadProducts();
  }

  filterData(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredDataSource = [...this.dataSource];
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    this.filteredDataSource = this.dataSource.filter(
      item =>
        item.productCode.toLowerCase().includes(term) ||
        item.persianProductName.toLowerCase().includes(term) ||
        item.englishProductName.toLowerCase().includes(term) ||
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

  onView(product: Product): void {
    this.router.navigate(['/console/product/view', product.id]);
  }

  onRowClick(product: Product): void {
    this.onView(product);
  }

  onEdit(product: Product): void {
    this.router.navigate(['/console/product/edit', product.id]);
  }

  onDelete(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف محصول',
        message: `آیا از حذف محصول "${product.persianProductName}" اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.alert.open('محصول با موفقیت حذف شد');
            this.loadProducts();
          },
          error: () => {
            this.alert.open('خطا در حذف محصول');
          },
        });
      }
    });
  }

  getStatusClass(status: string): string {
    return status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-warn-100 text-warn-800';
  }

  getStatusText(status: string): string {
    return status === 'ACTIVE' ? 'فعال' : 'غیر فعال';
  }
}

