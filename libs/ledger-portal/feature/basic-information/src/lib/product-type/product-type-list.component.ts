import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { ProductTypeService, ProductType as ApiProductType } from '@ledger-portal/data/product-type';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { EmptyStateComponent, ErrorStateComponent } from '@ledger-portal/shared/ui/empty-state';

import { ConfirmDeleteDialogComponent } from '../../../../account-group/src/lib/confirm-delete-dialog.component';
import { PRODUCT_TYPE_ADD_BUTTON_LABEL } from './product-type.constants';

@Component({
  selector: 'ledger-portal-product-type-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    LedgerPortalSharedUiBreadcrumbComponent,
    SvgIconTypeDirective,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  templateUrl: './product-type-list.component.html',
  styleUrl: './product-type-list.component.scss',
})
export class ProductTypeListComponent implements OnInit {
  readonly pageTitle = 'اطلاعات پایه';
  readonly sectionSubtitle = 'لیست نوع محصول';
  readonly addButtonLabel = PRODUCT_TYPE_ADD_BUTTON_LABEL;
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private productTypeService = inject(ProductTypeService);
  private alert = inject(AlertService);
  readonly searchPlaceholder = 'جستجوی کد / نام... ';

  private readonly allItems = signal<ApiProductType[]>([]);
  readonly query = signal<string>('');
  isLoading = false;
  hasError = false;

  private readonly fb = new FormBuilder();
  readonly searchForm = this.fb.nonNullable.group({
    term: [''],
  });

  readonly items = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.allItems();
    return this.allItems().filter(
      i => i.productTypeCode.toLowerCase().includes(q) || 
           i.persianProductTypeName.toLowerCase().includes(q) || 
           i.englishProductTypeName.toLowerCase().includes(q)
    );
  });

  readonly displayedColumns = [
    'productCode',
    'productName',
    'productNameEn',
    'description',
    'lastUpdated',
    'status',
    'actions',
  ] as const;

  ngOnInit(): void {
    this.loadProductTypes();
  }

  private loadProductTypes(): void {
    this.isLoading = true;
    this.hasError = false;
    this.productTypeService.getProductTypes().subscribe({
      next: productTypes => {
        this.allItems.set(productTypes);
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
    this.loadProductTypes();
  }

  onSearch(): void {
    const term = this.searchForm.controls.term.value?.trim() ?? '';
    this.query.set(term);
  }

  onView(row: ApiProductType): void {
    this.router.navigate(['/console/basic-information/product-type/view', row.id]);
  }

  onRowClick(row: ApiProductType): void {
    this.onView(row);
  }

  onEdit(row: ApiProductType): void {
    this.router.navigate(['/console/basic-information/product-type/edit', row.id]);
  }

  onDelete(productType: ApiProductType): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف نوع محصول',
        message: `آیا از حذف نوع محصول"${productType.persianProductTypeName}" اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productTypeService.deleteProductType(productType.id).subscribe({
          next: () => {
            this.alert.open('نوع محصول با موفقیت حذف شد');
            this.loadProductTypes();
          },
          error: () => {
            this.alert.open('خطا در حذف نوع محصول');
          },
        });
      }
    });
  }
}
