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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { AccountingRelationTypeService, AccountingRelationType } from '@ledger-portal/data/accounting-relation-type';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { EmptyStateComponent, ErrorStateComponent } from '@ledger-portal/shared/ui/empty-state';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

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
    MatProgressSpinnerModule,
    LedgerPortalSharedUiBreadcrumbComponent,
    MatTooltip,
    SvgIconTypeDirective,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  templateUrl: './accounting-relation-type-list.component.html',
  styleUrl: './accounting-relation-type-list.component.scss',
})
export class AccountingRelationTypeListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private accountingRelationTypeService = inject(AccountingRelationTypeService);
  private alert = inject(AlertService);

  displayedColumns: string[] = ['code', 'nameFa', 'nameEn', 'subsystem', 'productType', 'status', 'actions'];

  dataSource: AccountingRelationType[] = [];
  isLoading = false;
  hasError = false;

  searchForm = this.fb.group({
    searchTerm: [''],
  });

  filteredDataSource: AccountingRelationType[] = [];

  ngOnInit(): void {
    this.loadAccountingRelationTypes();
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => this.filterData(value!));
  }

  private loadAccountingRelationTypes(): void {
    this.isLoading = true;
    this.hasError = false;
    this.accountingRelationTypeService.getAccountingRelationTypes().subscribe({
      next: accountingRelationTypes => {
        this.dataSource = accountingRelationTypes;
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
    this.loadAccountingRelationTypes();
  }

  filterData(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredDataSource = [...this.dataSource];
      return;
    }
    const term = searchTerm.toLowerCase().trim();
    this.filteredDataSource = this.dataSource.filter(item =>
      item.accountingRelationCode.toLowerCase().includes(term) ||
      item.persianTitle.toLowerCase().includes(term) ||
      item.englishTitle.toLowerCase().includes(term)
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

  onView(row: AccountingRelationType): void {
    this.router.navigate(['/console/accounting-relation-type/view', row.id]);
  }

  onRowClick(row: AccountingRelationType): void {
    this.onView(row);
  }

  onEdit(row: AccountingRelationType): void {
    this.router.navigate(['/console/accounting-relation-type/edit', row.id]);
  }

  onDelete(row: AccountingRelationType): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف نوع رابطه حسابداری',
        message: `آیا از حذف '${row.persianTitle}' اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountingRelationTypeService.deleteAccountingRelationType(row.id).subscribe({
          next: () => {
            this.alert.open('نوع رابطه حسابداری با موفقیت حذف شد');
            this.loadAccountingRelationTypes();
          },
          error: () => {
            this.alert.open('خطا در حذف نوع رابطه حسابداری');
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

