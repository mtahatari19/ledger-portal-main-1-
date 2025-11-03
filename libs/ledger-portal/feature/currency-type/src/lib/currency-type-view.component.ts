import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { CurrencyTypeService } from '@ledger-portal/data/currency-type';

@Component({
  selector: 'ledger-portal-currency-type-view',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './currency-type-view.component.html',
})
export class CurrencyTypeViewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private currencyTypeService = inject(CurrencyTypeService);

  currencyTypeId: number | null = null;

  form = this.fb.group({
    currencyTypeCode: [{ value: '', disabled: true }, [Validators.required]],
    persianName: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
    englishName: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
    isoNumericCode: [{ value: null as number | null, disabled: true }, [Validators.required]],
    isoLetterCode: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(3)]],
    decimalPrecision: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0), Validators.max(4)]],
    description: [{ value: '', disabled: true }],
    status: [{ value: 'ACTIVE', disabled: true }, [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.currencyTypeId = Number(id);
        this.loadCurrencyTypeData(this.currencyTypeId);
      }
    });
  }

  private loadCurrencyTypeData(id: number): void {
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
        this.router.navigate(['/console/currency-type/list']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/currency-type/list']);
  }
}

