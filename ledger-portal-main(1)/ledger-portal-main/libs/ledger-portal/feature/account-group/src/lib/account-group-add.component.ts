import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';

export interface GroupType {
  value: string;
  label: string;
}

export interface Status {
  value: string;
  label: string;
}

@Component({
  selector: 'ledger-portal-account-group',
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
  templateUrl: './account-group-add.component.html',
  styleUrl: './account-group-add.component.scss',
})
export class AccountGroupAddComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);

  groupTypes: GroupType[] = [
    { value: 'asset', label: 'دارایی' },
    { value: 'liability', label: 'بدهی' },
    { value: 'equity', label: 'حقوق صاحبان سهام' },
    { value: 'income', label: 'درآمد' },
    { value: 'expense', label: 'هزینه' },
  ];

  statuses: Status[] = [
    { value: 'active', label: 'فعال' },
    { value: 'inactive', label: 'غیرفعال' },
  ];

  accountGroupForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    englishName: ['', [Validators.required, Validators.maxLength(100)]],
    groupType: ['', [Validators.required]],
    status: ['active', [Validators.required]],
    description: ['', [Validators.maxLength(500)]],
  });

  onSubmit(): void {
    if (this.accountGroupForm.valid) {
      this.alert.open('گروه حساب جدید با موفقیت انجام شد.');
      this.router.navigate(['/console/basic-information']);
      this.goBack();
    } else {
      Object.keys(this.accountGroupForm.controls).forEach(key => {
        this.accountGroupForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/console/basic-information']);
  }

  getFieldError(fieldName: string): string {
    const field = this.accountGroupForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'این فیلد اجباری است';
    }
    if (field?.hasError('maxlength')) {
      const maxLength = field.errors?.['maxlength']?.requiredLength;
      return `حداکثر ${maxLength} کاراکتر مجاز است`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.accountGroupForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
}
