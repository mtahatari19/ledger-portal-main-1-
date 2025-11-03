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
import { CurrencyService } from '@ledger-portal/data/currency';

@Component({
  selector: 'ledger-portal-currency-add',
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
  templateUrl: './currency-add.component.html',
})
export class CurrencyAddComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);
  private currencyService = inject(CurrencyService);

  form = this.fb.group({
    code: ['', [Validators.required]],
    nameFa: ['', [Validators.required, Validators.maxLength(200)]],
    isoNumeric: [0, [Validators.required]],
    swiftCode: [''],
    symbol: ['', [Validators.required, Validators.maxLength(3)]],
    decimalPlaces: [0, [Validators.required, Validators.min(0), Validators.max(4)]],
  });

  onSubmit(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }

    const formValue = this.form.value;
    const request = {
      currencyCode: formValue.code || '',
      currencyNumCode: formValue.isoNumeric || 0,
      swiftCode: formValue.swiftCode || '',
      currencyName: formValue.nameFa || '',
      symbol: formValue.symbol || '',
      decimalPrecision: formValue.decimalPlaces || 0,
    };

    this.currencyService.createCurrency(request).subscribe({
      next: () => {
        this.alert.open('ارز با موفقیت ثبت شد');
        this.router.navigate(['/console/currency/list']);
      },
      error: () => {
        this.alert.open('خطا در ثبت ارز');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/currency/list']);
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


