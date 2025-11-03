import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AccountGroupService } from '@ledger-portal/data/account-group';

interface GroupType {
  value: string;
  label: string;
}

interface Status {
  value: string;
  label: string;
}

@Component({
  selector: 'ledger-portal-account-group-view',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './account-group-view.component.html',
  styleUrl: './account-group-view.component.scss',
})
export class AccountGroupViewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private accountGroupService = inject(AccountGroupService);

  accountGroupId: number | null = null;

  groupTypes: GroupType[] = [
    { value: 'asset', label: 'دارایی' },
    { value: 'liability', label: 'بدهی' },
    { value: 'equity', label: 'حقوق صاحبان سهام' },
    { value: 'income', label: 'درآمد' },
    { value: 'expense', label: 'هزینه' },
  ];

  statuses: Status[] = [
    { value: 'true', label: 'فعال' },
    { value: 'false', label: 'غیرفعال' },
  ];

  accountGroupForm = this.fb.group({
    code: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]],
    name: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)]],
    englishName: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)]],
    groupType: [{ value: '', disabled: true }, [Validators.required]],
    status: [{ value: 'true', disabled: true }, [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.accountGroupId = Number(id);
        this.loadAccountGroupData(this.accountGroupId);
      }
    });
  }

  private loadAccountGroupData(id: number): void {
    this.accountGroupService.getAccountGroupById(id).subscribe({
      next: accountGroup => {
        this.accountGroupForm.patchValue({
          code: accountGroup.code,
          name: accountGroup.name,
          englishName: accountGroup.englishName,
          groupType: accountGroup.groupType,
          status: accountGroup.status.toString(),
        });
      },
      error: () => {
        this.router.navigate(['/console/account-group/list']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/account-group/list']);
  }
}

