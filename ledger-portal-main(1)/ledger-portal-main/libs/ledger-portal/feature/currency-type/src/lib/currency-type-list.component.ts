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

export interface CurrencyTypeRow {
  id: string;
  code: string; // textual unique id
  nameFa: string;
  nameEn: string;
  isoNumeric: number; // 3-digit
  isoAlpha: string; // 3-letter
  decimalPlaces: number; // 0..4
  status: boolean;
  description?: string;
}

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
    LedgerPortalSharedUiBreadcrumbComponent,
    MatTooltip,
    SvgIconTypeDirective,
  ],
  templateUrl: './currency-type-list.component.html',
})
export class CurrencyTypeListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['code', 'nameFa', 'nameEn', 'isoNumeric', 'isoAlpha', 'decimalPlaces', 'status', 'actions'];

  dataSource: CurrencyTypeRow[] = [
    { id: 'IRR', code: 'IRR', nameFa: 'ریال ایران', nameEn: 'Iranian Rial', isoNumeric: 364, isoAlpha: 'IRR', decimalPlaces: 0, status: true },
    { id: 'USD', code: 'USD', nameFa: 'دلار آمریکا', nameEn: 'US Dollar', isoNumeric: 840, isoAlpha: 'USD', decimalPlaces: 2, status: true },
    { id: 'EUR', code: 'EUR', nameFa: 'یورو', nameEn: 'Euro', isoNumeric: 978, isoAlpha: 'EUR', decimalPlaces: 2, status: false },
  ];

  searchForm = this.fb.group({ searchTerm: [''] });
  filteredDataSource: CurrencyTypeRow[] = [];

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
      row.code.toLowerCase().includes(t) ||
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
    this.router.navigate(['/console/currency-type/add']);
  }

  onEdit(row: CurrencyTypeRow): void {
    this.router.navigate([`/console/currency-type/edit`, row.id]);
  }

  onDelete(row: CurrencyTypeRow): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف نوع ارز',
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


