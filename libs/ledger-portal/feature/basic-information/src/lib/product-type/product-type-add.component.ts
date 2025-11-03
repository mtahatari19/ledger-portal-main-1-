import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { ProductTypeService } from '@ledger-portal/data/product-type';

@Component({
  selector: 'ledger-portal-product-type-add',
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
  templateUrl: './product-type-add.component.html',
  styleUrl: './product-type-add.component.scss',
})
export class ProductTypeAddComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);
  private productTypeService = inject(ProductTypeService);

  readonly form: FormGroup = this.fb.group({
    code: [''],
    nameFa: [''],
    nameEn: [''],
    features: [''],
    description: [''],
  });

  submit(): void {
    if (this.form.invalid) {
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
    };

    this.productTypeService.createProductType(request).subscribe({
      next: () => {
        this.alert.open('نوع محصول با موفقیت ثبت شد');
        this.router.navigate(['/console/basic-information']);
      },
      error: () => {
        this.alert.open('خطا در ثبت نوع محصول');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/basic-information']);
  }
}


