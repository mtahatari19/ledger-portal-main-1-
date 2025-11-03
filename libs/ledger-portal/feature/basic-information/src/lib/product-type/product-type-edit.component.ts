import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { ProductTypeService } from '@ledger-portal/data/product-type';

@Component({
  selector: 'ledger-portal-product-type-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './product-type-edit.component.html',
  styleUrl: './product-type-edit.component.scss',
})
export class ProductTypeEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alert = inject(AlertService);
  private productTypeService = inject(ProductTypeService);

  productTypeId: number | null = null;

  readonly form: FormGroup = this.fb.group({
    code: [''],
    nameFa: [''],
    nameEn: [''],
    status: ['ACTIVE'],
    features: [''],
    description: [''],
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
        this.alert.open('خطا در بارگذاری اطلاعات نوع محصول');
        this.router.navigate(['/console/basic-information']);
      },
    });
  }

  submit(): void {
    if (this.form.invalid || !this.productTypeId) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const request = {
      productTypeCode: formValue.code || '',
      persianProductTypeName: formValue.nameFa || '',
      englishProductTypeName: formValue.nameEn || '',
      summary: formValue.description || '',
      features: formValue.features || '',
      status: formValue.status || 'ACTIVE',
    };

    this.productTypeService.updateProductType(this.productTypeId, request).subscribe({
      next: () => {
        this.alert.open('نوع محصول با موفقیت بروزرسانی شد');
        this.router.navigate(['/console/basic-information']);
      },
      error: () => {
        this.alert.open('خطا در بروزرسانی نوع محصول');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/basic-information']);
  }
}

