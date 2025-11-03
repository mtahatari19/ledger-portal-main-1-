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
import { CurrencyService, Currency } from '@ledger-portal/data/currency';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { EmptyStateComponent, ErrorStateComponent } from '@ledger-portal/shared/ui/empty-state';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

@Component({
  selector: 'ledger-portal-currency-list',
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
  templateUrl: './currency-list.component.html',
})
export class CurrencyListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private currencyService = inject(CurrencyService);
  private alert = inject(AlertService);

  displayedColumns: string[] = [
    'code',
    'nameFa',
    'nameEn',
    'isoNumeric',
    'isoAlpha',
    'swiftCode',
    'symbol',
    'decimalPlaces',
    'status',
    'actions',
  ];

  dataSource: Currency[] = [];
  isLoading = false;
  hasError = false;

  searchForm = this.fb.group({ searchTerm: [''] });
  filteredDataSource: Currency[] = [];

  ngOnInit(): void {
    this.loadCurrencies();
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(v => this.filter(v || ''));
  }

  private loadCurrencies(): void {
    this.isLoading = true;
    this.hasError = false;
    this.currencyService.getCurrencies().subscribe({
      next: currencies => {
        this.dataSource = currencies;
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
    this.loadCurrencies();
  }

  filter(term: string): void {
    const t = term.trim().toLowerCase();
    if (!t) {
      this.filteredDataSource = [...this.dataSource];
      return;
    }
    this.filteredDataSource = this.dataSource.filter(row =>
      row.currencyName.toLowerCase().includes(t) ||
      String(row.currencyNumCode).includes(t) ||
      row.currencyCode.toLowerCase().includes(t)
    );
  }

  onSearch(): void {
    const v = this.searchForm.get('searchTerm')?.value || '';
    this.filter(v);
  }

  onClearSearch(): void {
    this.searchForm.get('searchTerm')?.setValue('');
    this.filteredDataSource = [...this.dataSource];
  }

  onCreateNew(): void {
    this.router.navigate(['/console/currency/add']);
  }

  onView(row: Currency): void {
    this.router.navigate(['/console/currency/view', row.id]);
  }

  onRowClick(row: Currency): void {
    this.onView(row);
  }

  onEdit(row: Currency): void {
    this.router.navigate(['/console/currency/edit', row.id]);
  }

  onDelete(row: Currency): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف ارز',
        message: `آیا از حذف '${row.currencyName}' اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currencyService.deleteCurrency(row.id).subscribe({
          next: () => {
            this.alert.open('ارز با موفقیت حذف شد');
            this.loadCurrencies();
          },
          error: () => {
            this.alert.open('خطا در حذف ارز');
          },
        });
      }
    });
  }

  getStatusClass(status: string): string {
    return status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700';
  }

  getStatusText(status: string): string {
    return status === 'ACTIVE' ? 'فعال' : 'غیرفعال';
  }
}


