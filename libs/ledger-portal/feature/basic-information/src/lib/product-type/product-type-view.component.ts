import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { ProductTypeService } from '@ledger-portal/data/product-type';

@Component({
  selector: 'ledger-portal-product-type-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './product-type-view.component.html',
  styleUrl: './product-type-view.component.scss',
})
export class ProductTypeViewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productTypeService = inject(ProductTypeService);

  productTypeId: number | null = null;

  readonly form: FormGroup = this.fb.group({
    code: [{ value: '', disabled: true }],
    nameFa: [{ value: '', disabled: true }],
    nameEn: [{ value: '', disabled: true }],
    status: [{ value: 'ACTIVE', disabled: true }],
    features: [{ value: '', disabled: true }],
    description: [{ value: '', disabled: true }],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productTypeId = Number(id);
        this.loadProductTypeData(this.productTypeId);
      }
    });
  }

  private loadProductTypeData(id: number): void {
    this.productTypeService.getProductTypeById(id).subscribe({
      next: productType => {
        this.form.patchValue({
          code: productType.productTypeCode,
          nameFa: productType.persianProductTypeName,
          nameEn: productType.englishProductTypeName,
          status: productType.status,
          features: productType.features,
          description: productType.summary || '',
        });
      },
      error: () => {
        this.router.navigate(['/console/basic-information']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/basic-information']);
  }
}

