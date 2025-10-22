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

  form = this.fb.group({
    code: [null as number | null, [Validators.required]],
    nameFa: ['', [Validators.required, Validators.maxLength(200)]],
    nameEn: ['', [Validators.required, Validators.maxLength(200)]],
    isoNumeric: [null as number | null, [Validators.required]],
    isoAlpha: ['', [Validators.required, Validators.maxLength(3)]],
    swiftCode: [''],
    symbol: ['', [Validators.required, Validators.maxLength(3)]],
    decimalPlaces: [2, [Validators.required, Validators.min(0), Validators.max(4)]],
    description: [''],
    status: [true, [Validators.required]],
  });

  onSubmit(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }
    this.alert.open('ارز با موفقیت ثبت شد.');
    this.router.navigate(['/console/basic-information']);
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


