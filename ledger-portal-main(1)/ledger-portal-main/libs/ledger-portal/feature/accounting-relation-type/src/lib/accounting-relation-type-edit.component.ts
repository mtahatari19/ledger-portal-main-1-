import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';

interface SelectOption { value: string; label: string; }

interface AccountingRelationType {
  id: string;
  code: number;
  nameFa: string;
  nameEn: string;
  subsystem: string;
  productType?: string;
  description?: string;
  status: boolean;
}

@Component({
  selector: 'ledger-portal-accounting-relation-type-edit',
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
  templateUrl: './accounting-relation-type-edit.component.html',
  styleUrl: './accounting-relation-type-edit.component.scss',
})
export class AccountingRelationTypeEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alert = inject(AlertService);

  relationId: string | null = null;

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
    code: [null as number | null, [Validators.required]],
    nameFa: ['', [Validators.required, Validators.maxLength(200)]],
    nameEn: ['', [Validators.required, Validators.maxLength(200)]],
    subsystem: ['', [Validators.required]],
    productType: [''],
    description: [''],
    status: [true],
  });

  // Mock list - replace with API integration when available
  private mockData: AccountingRelationType[] = [
    { id: '1', code: 1, nameFa: 'تعهدات سازمان', nameEn: 'Organization Obligation', subsystem: 'GL', status: true },
    { id: '2', code: 2, nameFa: 'طرف تعهدات', nameEn: 'Counterparty Obligation', subsystem: 'GL', status: true },
    { id: '3', code: 3, nameFa: 'پیش‌دریافت حساب پرداختنی', nameEn: 'Payable Prepayment', subsystem: 'GL', productType: 'credit', status: false },
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.relationId = params['id'] ?? null;
      if (this.relationId) {
        this.loadData(this.relationId);
      }
    });
  }

  private loadData(id: string): void {
    const row = this.mockData.find(x => x.id === id);
    if (!row) {
      this.router.navigate(['/console/accounting-relation-type/list']);
      return;
    }
    this.form.patchValue({
      code: row.code,
      nameFa: row.nameFa,
      nameEn: row.nameEn,
      subsystem: row.subsystem,
      productType: row.productType ?? '',
      description: row.description ?? '',
      status: row.status,
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }
    this.alert.open('رابطه حسابداری با موفقیت بروزرسانی شد.');
    this.router.navigate(['/console/basic-information']);
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


