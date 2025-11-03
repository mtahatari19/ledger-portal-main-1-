import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { CurrencyTypeService, CurrencyType } from '@ledger-portal/data/currency-type';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { EmptyStateComponent, ErrorStateComponent } from '@ledger-portal/shared/ui/empty-state';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

@Component({
  selector: 'ledger-portal-currency-type-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LedgerPortalSharedUiBreadcrumbComponent,
    MatTooltip,
    SvgIconTypeDirective,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  templateUrl: './currency-type-list.component.html',
})
export class CurrencyTypeListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private currencyTypeService = inject(CurrencyTypeService);
  private alert = inject(AlertService);

  displayedColumns: string[] = ['code', 'nameFa', 'nameEn', 'isoNumeric', 'isoAlpha', 'decimalPlaces', 'status', 'actions'];

  dataSource: CurrencyType[] = [];
  isLoading = false;
  hasError = false;

  searchForm = this.fb.group({ searchTerm: [''] });
  filteredDataSource: CurrencyType[] = [];

  ngOnInit(): void {
    this.loadCurrencyTypes();
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => this.filterData(value!));
  }

  private loadCurrencyTypes(): void {
    this.isLoading = true;
    this.hasError = false;
    this.currencyTypeService.getCurrencyTypes().subscribe({
      next: currencyTypes => {
        this.dataSource = currencyTypes;
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
    this.loadCurrencyTypes();
  }

  filterData(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredDataSource = [...this.dataSource];
      return;
    }
    const term = searchTerm.toLowerCase().trim();
    this.filteredDataSource = this.dataSource.filter(item =>
      item.currencyTypeCode.toLowerCase().includes(term) ||
      item.persianName.toLowerCase().includes(term) ||
      item.englishName.toLowerCase().includes(term) ||
      String(item.isoNumericCode).includes(term) ||
      item.isoLetterCode.toLowerCase().includes(term)
    );
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    this.filterData(searchTerm!);
  }

  onClearSearch(): void {
    this.searchForm.get('searchTerm')?.setValue('');
    this.filteredDataSource = [...this.dataSource];
  }

  onCreateNew(): void {
    this.router.navigate(['/console/currency-type/add']);
  }

  onView(row: CurrencyType): void {
    this.router.navigate(['/console/currency-type/view', row.id]);
  }

  onRowClick(row: CurrencyType): void {
    this.onView(row);
  }

  onEdit(row: CurrencyType): void {
    this.router.navigate(['/console/currency-type/edit', row.id]);
  }

  onDelete(row: CurrencyType): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف نوع ارز',
        message: `آیا از حذف '${row.persianName}' اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currencyTypeService.deleteCurrencyType(row.id).subscribe({
          next: () => {
            this.alert.open('نوع ارز با موفقیت حذف شد');
            this.loadCurrencyTypes();
          },
          error: () => {
            this.alert.open('خطا در حذف نوع ارز');
          },
        });
      }
    });
  }

  getStatusClass(status: string): string {
    return status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-warn-100 text-warn-800';
  }

  getStatusText(status: string): string {
    return status === 'ACTIVE' ? 'فعال' : 'غیرفعال';
  }
}


