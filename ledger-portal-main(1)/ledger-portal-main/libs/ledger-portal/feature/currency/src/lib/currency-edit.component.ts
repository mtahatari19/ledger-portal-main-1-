import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';

interface CurrencyRow {
  id: string;
  code: number;
  nameFa: string;
  nameEn: string;
  isoNumeric: number;
  isoAlpha: string;
  swiftCode?: string;
  symbol: string;
  decimalPlaces: number;
  description?: string;
  status: boolean;
}

@Component({
  selector: 'ledger-portal-currency-edit',
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
  templateUrl: './currency-edit.component.html',
})
export class CurrencyEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alert = inject(AlertService);

  currencyId: string | null = null;

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

  // Mock data for edit
  private mockData: CurrencyRow[] = [
    { id: '1', code: 1, nameFa: 'ریال ایران', nameEn: 'Iranian Rial', isoNumeric: 364, isoAlpha: 'IRR', swiftCode: 'IRN', symbol: '﷼', decimalPlaces: 0, status: true },
    { id: '2', code: 2, nameFa: 'دلار آمریکا', nameEn: 'US Dollar', isoNumeric: 840, isoAlpha: 'USD', swiftCode: 'USA', symbol: '$', decimalPlaces: 2, status: true },
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currencyId = params['id'] ?? null;
      if (this.currencyId) {
        this.load(this.currencyId);
      }
    });
  }

  private load(id: string): void {
    const row = this.mockData.find(x => x.id === id);
    if (!row) {
      this.router.navigate(['/console/currency/list']);
      return;
    }
    this.form.patchValue({
      code: row.code,
      nameFa: row.nameFa,
      nameEn: row.nameEn,
      isoNumeric: row.isoNumeric,
      isoAlpha: row.isoAlpha,
      swiftCode: row.swiftCode ?? '',
      symbol: row.symbol,
      decimalPlaces: row.decimalPlaces,
      description: row.description ?? '',
      status: row.status,
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }
    this.alert.open('ارز با موفقیت بروزرسانی شد.');
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


