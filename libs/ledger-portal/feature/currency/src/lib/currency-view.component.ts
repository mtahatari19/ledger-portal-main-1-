import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { CurrencyService } from '@ledger-portal/data/currency';

@Component({
  selector: 'ledger-portal-currency-view',
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
  templateUrl: './currency-view.component.html',
})
export class CurrencyViewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private currencyService = inject(CurrencyService);

  currencyId: number | null = null;

  form = this.fb.group({
    code: [{ value: '', disabled: true }, [Validators.required]],
    nameFa: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
    isoNumeric: [{ value: 0, disabled: true }, [Validators.required]],
    swiftCode: [{ value: '', disabled: true }],
    symbol: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(3)]],
    decimalPlaces: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0), Validators.max(4)]],
    status: [{ value: 'ACTIVE', disabled: true }, [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.currencyId = Number(id);
        this.loadCurrencyData(this.currencyId);
      }
    });
  }

  private loadCurrencyData(id: number): void {
    this.currencyService.getCurrencyById(id).subscribe({
      next: currency => {
        this.form.patchValue({
          code: currency.currencyCode,
          nameFa: currency.currencyName,
          isoNumeric: currency.currencyNumCode,
          swiftCode: currency.swiftCode,
          symbol: currency.symbol,
          decimalPlaces: currency.decimalPrecision,
          status: currency.status,
        });
      },
      error: () => {
        this.router.navigate(['/console/currency/list']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/currency/list']);
  }
}

