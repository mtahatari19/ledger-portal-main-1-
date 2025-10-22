import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AccountGroup } from '@ledger-portal/feature/account-group';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

import { ConfirmDeleteDialogComponent } from '../../../../account-group/src/lib/confirm-delete-dialog.component';
import { PRODUCT_TYPE_ADD_BUTTON_LABEL } from './product-type.constants';
import { PRODUCT_TYPE_MOCK } from './product-type.mock';
import { ProductType } from './product-type.model';

@Component({
  selector: 'ledger-portal-product-type-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // material
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    // shared
    LedgerPortalSharedUiBreadcrumbComponent,
    SvgIconTypeDirective,
  ],
  templateUrl: './product-type-list.component.html',
  styleUrl: './product-type-list.component.scss',
})
export class ProductTypeListComponent {
  // Page header titles
  readonly pageTitle = 'اطلاعات پایه';
  readonly sectionSubtitle = 'لیست نوع محصول';
  readonly addButtonLabel = PRODUCT_TYPE_ADD_BUTTON_LABEL;
  private dialog = inject(MatDialog);
  readonly searchPlaceholder = 'جستجوی کد / نام... ';

  private readonly allItems = signal<ProductType[]>(PRODUCT_TYPE_MOCK);
  readonly query = signal<string>('');

  private readonly fb = new FormBuilder();
  readonly searchForm = this.fb.nonNullable.group({
    term: [''],
  });

  readonly items = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.allItems();
    return this.allItems().filter(
      i => i.code.includes(q) || i.nameFa.toLowerCase().includes(q) || (i.nameEn ?? '').toLowerCase().includes(q)
    );
  });

  // Mat-table column order
  readonly displayedColumns = [
    'productCode',
    'productName',
    'productNameEn',
    'description',
    'lastUpdated',
    'status',
    'actions',
  ] as const;

  onSearch(): void {
    const term = this.searchForm.controls.term.value?.trim() ?? '';
    this.query.set(term);
  }

  onEdit(row: ProductType): void {
    // Placeholder for navigation to edit form
    // Implement routing when endpoint is ready
    // eslint-disable-next-line no-console
    console.log('edit', row);
  }

  onDelete(productType: ProductType): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف نوع محصول',
        message: `آیا از حذف نوع محصول"${productType.nameFa}" اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allItems.set(this.allItems().filter(item => item.code !== productType.code));
      }
    });
  }
}
