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
import { AccountGroupService, AccountGroup } from '@ledger-portal/data/account-group';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { EmptyStateComponent, ErrorStateComponent } from '@ledger-portal/shared/ui/empty-state';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

@Component({
  selector: 'ledger-portal-account-group-list',
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
  templateUrl: './account-group-list.component.html',
  styleUrl: './account-group-list.component.scss',
})
export class AccountGroupListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private accountGroupService = inject(AccountGroupService);
  private alert = inject(AlertService);

  displayedColumns: string[] = ['code', 'name', 'englishName', 'groupType', 'lastUpdate', 'status', 'actions'];

  dataSource: AccountGroup[] = [];
  isLoading = false;
  hasError = false;

  searchForm = this.fb.group({
    searchTerm: [''],
  });

  filteredDataSource: AccountGroup[] = [];

  ngOnInit(): void {
    this.loadAccountGroups();

    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.filterData(value ?? '');
    });
  }

  private loadAccountGroups(): void {
    this.isLoading = true;
    this.hasError = false;
    this.accountGroupService.getAccountGroups().subscribe({
      next: accountGroups => {
        this.dataSource = accountGroups;
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
    this.loadAccountGroups();
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
        item.englishName.toLowerCase().includes(term)
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
    this.router.navigate(['/console/account-group/add']);
  }

  onEdit(accountGroup: AccountGroup): void {
    this.router.navigate(['/console/account-group/edit', accountGroup.id]);
  }

  onView(accountGroup: AccountGroup): void {
    this.router.navigate(['/console/account-group/view', accountGroup.id]);
  }

  onRowClick(accountGroup: AccountGroup): void {
    this.onView(accountGroup);
  }

  onDelete(accountGroup: AccountGroup): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'حذف گروه حساب',
        message: `آیا از حذف گروه حساب "${accountGroup.name}" اطمینان دارید؟`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountGroupService.deleteAccountGroup(accountGroup.id).subscribe({
          next: () => {
            this.alert.open('گروه حساب با موفقیت حذف شد');
            this.loadAccountGroups();
          },
          error: () => {
            this.alert.open('خطا در حذف گروه حساب');
          },
        });
      }
    });
  }

  getStatusClass(status: boolean): string {
    return status ? 'bg-green-100 text-green-800' : 'bg-warn-100 text-warn-800';
  }

  getStatusText(status: boolean): string {
    return status ? 'فعال' : 'غیر فعال';
  }
}
