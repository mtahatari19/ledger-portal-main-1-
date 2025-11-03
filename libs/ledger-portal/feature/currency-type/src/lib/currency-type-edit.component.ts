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
import { CurrencyTypeService } from '@ledger-portal/data/currency-type';

@Component({
  selector: 'ledger-portal-currency-type-edit',
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
  templateUrl: './currency-type-edit.component.html',
})
export class CurrencyTypeEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alert = inject(AlertService);
  private currencyTypeService = inject(CurrencyTypeService);

  currencyId: number | null = null;

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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.currencyId = Number(id);
        this.loadData(this.currencyId);
      }
    });
  }

  private loadData(id: number): void {
    this.currencyTypeService.getCurrencyTypeById(id).subscribe({
      next: currencyType => {
        this.form.patchValue({
          currencyTypeCode: currencyType.currencyTypeCode,
          persianName: currencyType.persianName,
          englishName: currencyType.englishName,
          isoNumericCode: currencyType.isoNumericCode,
          isoLetterCode: currencyType.isoLetterCode,
          decimalPrecision: currencyType.decimalPrecision,
          description: currencyType.description || '',
          status: currencyType.status,
        });
      },
      error: () => {
        this.alert.open('خطا در بارگذاری اطلاعات نوع ارز');
        this.router.navigate(['/console/currency-type/list']);
      },
    });
  }

  onSubmit(): void {
    if (!this.form.valid || !this.currencyId) {
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

    this.currencyTypeService.updateCurrencyType(this.currencyId, request).subscribe({
      next: () => {
        this.alert.open('نوع ارز با موفقیت بروزرسانی شد');
        this.router.navigate(['/console/currency-type/list']);
      },
      error: () => {
        this.alert.open('خطا در بروزرسانی نوع ارز');
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


