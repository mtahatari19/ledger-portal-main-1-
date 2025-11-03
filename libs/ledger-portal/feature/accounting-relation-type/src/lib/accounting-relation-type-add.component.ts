import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { AccountingRelationTypeService } from '@ledger-portal/data/accounting-relation-type';

interface SelectOption { value: string; label: string; }

@Component({
  selector: 'ledger-portal-accounting-relation-type-add',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatRadioModule,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './accounting-relation-type-add.component.html',
  styleUrl: './accounting-relation-type-add.component.scss',
})
export class AccountingRelationTypeAddComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);
  private accountingRelationTypeService = inject(AccountingRelationTypeService);

  subsystems: SelectOption[] = [
    { value: 'GL', label: 'GL' },
    { value: 'CRM', label: 'CRM' },
    { value: 'POS', label: 'POS' },
  ];

  productTypes: SelectOption[] = [
    { value: 'credit', label: 'Credit' },
    { value: 'subsidy', label: 'Subsidy' },
  ];

  form = this.fb.group({
    code: ['', [Validators.required]],
    nameFa: ['', [Validators.required, Validators.maxLength(200)]],
    nameEn: ['', [Validators.required, Validators.maxLength(200)]],
    subsystem: ['', [Validators.required]],
    productType: [''],
    description: [''],
  });

  onSubmit(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }

    const formValue = this.form.value;
    const request = {
      accountingRelationCode: formValue.code || '',
      persianTitle: formValue.nameFa || '',
      englishTitle: formValue.nameEn || '',
      subsystem: formValue.subsystem || '',
      productType: formValue.productType || '',
      summary: formValue.description || '',
    };

    this.accountingRelationTypeService.createAccountingRelationType(request).subscribe({
      next: () => {
        this.alert.open('نوع رابطه حسابداری با موفقیت ثبت شد');
        this.router.navigate(['/console/accounting-relation-type/list']);
      },
      error: () => {
        this.alert.open('خطا در ثبت نوع رابطه حسابداری');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/accounting-relation-type/list']);
  }

  getFieldError(field: string): string {
    const ctrl = this.form.get(field);
    if (ctrl?.hasError('required')) return 'این فیلد اجباری است';
    if (ctrl?.hasError('maxlength')) {
      const len = ctrl.errors?.['maxlength']?.requiredLength;
      return `حداکثر ${len} کاراکتر مجاز است`;
    }
    return '';
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && (ctrl?.dirty || ctrl?.touched));
  }
}

