import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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

export interface AccountingRelationType {
  id: string;
  code: number;
  nameFa: string;
  nameEn: string;
  subsystem: string;
  productType?: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'ledger-portal-accounting-relation-type-list',
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
  templateUrl: './accounting-relation-type-list.component.html',
  styleUrl: './accounting-relation-type-list.component.scss',
})
export class AccountingRelationTypeListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['code', 'nameFa', 'nameEn', 'subsystem', 'productType', 'status', 'actions'];

  dataSource: AccountingRelationType[] = [
    { id: '1', code: 1, nameFa: 'تعهدات سازمان', nameEn: 'Organization Obligation', subsystem: 'GL', status: 'active' },
    { id: '2', code: 2, nameFa: 'طرف تعهدات', nameEn: 'Counterparty Obligation', subsystem: 'GL', status: 'active' },
    { id: '3', code: 3, nameFa: 'پیش‌دریافت حساب پرداختنی', nameEn: 'Payable Prepayment', subsystem: 'GL', productType: 'Credit', status: 'inactive' },
    { id: '4', code: 4, nameFa: 'حساب دریافتنی', nameEn: 'Receivable Account', subsystem: 'CRM', status: 'active' },
    { id: '5', code: 5, nameFa: 'کارمزد', nameEn: 'Commission', subsystem: 'POS', status: 'active' },
  ];

  searchForm = this.fb.group({
    searchTerm: [''],
  });

  filteredDataSource: AccountingRelationType[] = [];

  ngOnInit(): void {
    this.filteredDataSource = [...this.dataSource];
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => this.filterData(value!));
  }

  filterData(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredDataSource = [...this.dataSource];
      return;
    }
    const term = searchTerm.toLowerCase().trim();
    this.filteredDataSource = this.dataSource.filter(item =>
      String(item.code).includes(term) ||
      item.nameFa.toLowerCase().includes(term) ||
      item.nameEn.toLowerCase().includes(term)
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
    this.router.navigate(['/console/accounting-relation-type/add']);
  }

  onEdit(row: AccountingRelationType): void {
    this.router.navigate(['/console/accounting-relation-type/edit', row.id]);
  }

  onDelete(row: AccountingRelationType): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف نوع رابطه حسابداری',
        message: `آیا از حذف '${row.nameFa}' اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter(item => item.id !== row.id);
        this.filteredDataSource = [...this.dataSource];
      }
    });
  }

  getStatusClass(status: 'active' | 'inactive'): string {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-warn-100 text-warn-800';
  }

  getStatusText(status: 'active' | 'inactive'): string {
    return status === 'active' ? 'فعال' : 'غیرفعال';
  }
}

