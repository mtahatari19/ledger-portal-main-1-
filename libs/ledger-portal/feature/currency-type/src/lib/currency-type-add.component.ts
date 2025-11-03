import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { CurrencyTypeService } from '@ledger-portal/data/currency-type';

@Component({
  selector: 'ledger-portal-currency-type-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './currency-type-add.component.html',
})
export class CurrencyTypeAddComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);
  private currencyTypeService = inject(CurrencyTypeService);

  form = this.fb.group({
    currencyTypeCode: ['', [Validators.required, Validators.maxLength(10)]],
    persianName: ['', [Validators.required, Validators.maxLength(200)]],
    englishName: ['', [Validators.required, Validators.maxLength(200)]],
    isoNumericCode: [null as number | null, [Validators.required]],
    isoLetterCode: ['', [Validators.required, Validators.maxLength(3)]],
    decimalPrecision: [0, [Validators.required, Validators.min(0), Validators.max(4)]],
    description: [''],
    status: ['ACTIVE', [Validators.required]],
  });

  onSubmit(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }

    const formValue = this.form.value;
    const request = {
      currencyTypeCode: formValue.currencyTypeCode || '',
      persianName: formValue.persianName || '',
      englishName: formValue.englishName || '',
      isoNumericCode: formValue.isoNumericCode || 0,
      isoLetterCode: formValue.isoLetterCode || '',
      decimalPrecision: formValue.decimalPrecision || 0,
      description: formValue.description || '',
      status: formValue.status || 'ACTIVE',
    };

    this.currencyTypeService.createCurrencyType(request).subscribe({
      next: () => {
        this.alert.open('نوع ارز با موفقیت ثبت شد');
        this.router.navigate(['/console/currency-type/list']);
      },
      error: () => {
        this.alert.open('خطا در ثبت نوع ارز');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/currency-type/list']);
  }

  getFieldError(field: string): string {
    const ctrl = this.form.get(field);
    if (ctrl?.hasError('required')) return 'این فیلد اجباری است';
    if (ctrl?.hasError('maxlength')) {
      const len = ctrl.errors?.['maxlength']?.requiredLength;
      return `حداکثر ${len} کاراکتر مجاز است`;
    }
    if (ctrl?.hasError('min') || ctrl?.hasError('max')) return 'مقدار وارد شده معتبر نیست';
    return '';
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && (ctrl?.dirty || ctrl?.touched));
  }
}


