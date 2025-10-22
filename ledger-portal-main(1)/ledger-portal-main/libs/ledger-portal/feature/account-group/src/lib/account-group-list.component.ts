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
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

export interface AccountGroup {
  id: string;
  code: string;
  name: string;
  englishName: string;
  groupType: string;
  lastUpdate: string;
  status: 'active' | 'inactive';
}

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
    LedgerPortalSharedUiBreadcrumbComponent,
    MatTooltip,
    SvgIconTypeDirective,
  ],
  templateUrl: './account-group-list.component.html',
  styleUrl: './account-group-list.component.scss',
})
export class AccountGroupListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['code', 'name', 'englishName', 'groupType', 'lastUpdate', 'status', 'actions'];

  dataSource: AccountGroup[] = [
    {
      id: '1',
      code: 'ACC_ASSET',
      name: 'دارایی ها',
      englishName: 'ASSETS',
      groupType: 'بالای خط',
      lastUpdate: '۱۴۰۴/۰۷/۲۲ - ۱۴:۳۲',
      status: 'active',
    },
    {
      id: '2',
      code: 'ACC_LIAB',
      name: 'بدهی ها',
      englishName: 'LIABILITIES',
      groupType: 'زیر خط',
      lastUpdate: '۱۴۰۴/۰۷/۲۱ - ۱۶:۳۰',
      status: 'active',
    },
    {
      id: '3',
      code: 'ACC_EQUITY',
      name: 'سرمایه',
      englishName: 'ACC_EQUITY',
      groupType: 'زیر خط',
      lastUpdate: '۱۴۰۴/۰۷/۲۰ - ۱۰:۰۰',
      status: 'active',
    },
    {
      id: '4',
      code: 'ACC_REV',
      name: 'درآمدها',
      englishName: 'ACC_REV',
      groupType: 'زیر خط',
      lastUpdate: '۱۴۰۴/۰۷/۱۷ - ۱۸:۵۲',
      status: 'inactive',
    },
    {
      id: '5',
      code: 'ACC_EXP',
      name: 'هزینه ها',
      englishName: 'ACC_EXP',
      groupType: 'بالای خط',
      lastUpdate: '۱۴۰۴/۰۷/۱۷ - ۱۲:۰۱',
      status: 'inactive',
    },
    {
      id: '6',
      code: 'ACC_EXP',
      name: 'بدهی ها',
      englishName: 'LIABILITIES',
      groupType: 'بالای خط',
      lastUpdate: '۱۴۰۴/۰۷/۱۵ - ۱۴:۲۰',
      status: 'active',
    },
  ];

  searchForm = this.fb.group({
    searchTerm: [''],
  });

  filteredDataSource: AccountGroup[] = [];

  ngOnInit(): void {
    this.filteredDataSource = [...this.dataSource];

    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.filterData(value ?? '');
    });
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
        this.dataSource = this.dataSource.filter(item => item.id !== accountGroup.id);
        this.filteredDataSource = [...this.dataSource];
      }
    });
  }

  getStatusClass(status: 'active' | 'inactive'): string {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-warn-100 text-warn-800';
  }

  getStatusText(status: 'active' | 'inactive'): string {
    return status === 'active' ? 'فعال' : 'غیر فعال';
  }
}
