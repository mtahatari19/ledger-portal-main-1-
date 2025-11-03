import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AccountingRelationTypeService } from '@ledger-portal/data/accounting-relation-type';

interface SelectOption { value: string; label: string; }

@Component({
  selector: 'ledger-portal-accounting-relation-type-view',
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
  templateUrl: './accounting-relation-type-view.component.html',
  styleUrl: './accounting-relation-type-view.component.scss',
})
export class AccountingRelationTypeViewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private accountingRelationTypeService = inject(AccountingRelationTypeService);

  accountingRelationTypeId: number | null = null;

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
    code: [{ value: null as number | null, disabled: true }, [Validators.required]],
    nameFa: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
    nameEn: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
    subsystem: [{ value: '', disabled: true }, [Validators.required]],
    productType: [{ value: '', disabled: true }],
    description: [{ value: '', disabled: true }],
    status: [{ value: true, disabled: true }],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.accountingRelationTypeId = Number(id);
        this.loadAccountingRelationTypeData(this.accountingRelationTypeId);
      }
    });
  }

  private loadAccountingRelationTypeData(id: number): void {
    this.accountingRelationTypeService.getAccountingRelationTypeById(id).subscribe({
      next: accountingRelationType => {
        this.form.patchValue({
          code: Number(accountingRelationType.accountingRelationCode),
          nameFa: accountingRelationType.persianTitle,
          nameEn: accountingRelationType.englishTitle,
          subsystem: accountingRelationType.subsystem,
          productType: accountingRelationType.productType,
          description: accountingRelationType.summary || '',
          status: accountingRelationType.status === 'ACTIVE',
        });
      },
      error: () => {
        this.router.navigate(['/console/accounting-relation-type/list']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/accounting-relation-type/list']);
  }
}

