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
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

export interface CurrencyRow {
  id: string;
  code: number; // unique id
  nameFa: string;
  nameEn: string;
  isoNumeric: number; // e.g., 364
  isoAlpha: string; // e.g., IRR
  swiftCode?: string; // e.g., IRN
  symbol: string; // e.g., ﷼
  decimalPlaces: number; // 0..4
  status: boolean;
}

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
    LedgerPortalSharedUiBreadcrumbComponent,
    MatTooltip,
    SvgIconTypeDirective,
  ],
  templateUrl: './currency-list.component.html',
})
export class CurrencyListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);

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

  dataSource: CurrencyRow[] = [
    { id: '1', code: 1, nameFa: 'ریال ایران', nameEn: 'Iranian Rial', isoNumeric: 364, isoAlpha: 'IRR', swiftCode: 'IRN', symbol: '﷼', decimalPlaces: 0, status: true },
    { id: '2', code: 2, nameFa: 'دلار آمریکا', nameEn: 'US Dollar', isoNumeric: 840, isoAlpha: 'USD', swiftCode: 'USA', symbol: '$', decimalPlaces: 2, status: true },
    { id: '3', code: 3, nameFa: 'یورو', nameEn: 'Euro', isoNumeric: 978, isoAlpha: 'EUR', swiftCode: 'EUR', symbol: '€', decimalPlaces: 2, status: false },
  ];

  searchForm = this.fb.group({ searchTerm: [''] });
  filteredDataSource: CurrencyRow[] = [];

  ngOnInit(): void {
    this.filteredDataSource = [...this.dataSource];
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(v => this.filter(v || ''));
  }

  filter(term: string): void {
    const t = term.trim().toLowerCase();
    if (!t) {
      this.filteredDataSource = [...this.dataSource];
      return;
    }
    this.filteredDataSource = this.dataSource.filter(row =>
      row.nameFa.toLowerCase().includes(t) ||
      row.nameEn.toLowerCase().includes(t) ||
      String(row.isoNumeric).includes(t) ||
      row.isoAlpha.toLowerCase().includes(t)
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

  onEdit(row: CurrencyRow): void {
    this.router.navigate(['/console/currency/edit', row.id]);
  }

  onDelete(row: CurrencyRow): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف ارز',
        message: `آیا از حذف '${row.nameFa}' اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter(x => x.id !== row.id);
        this.filteredDataSource = [...this.dataSource];
      }
    });
  }

  getStatusClass(status: boolean): string {
    return status ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700';
  }

  getStatusText(status: boolean): string {
    return status ? 'فعال' : 'غیرفعال';
  }
}


