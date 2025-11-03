import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { ProductService } from '@ledger-portal/data/product';

interface ProductType {
  value: string;
  label: string;
}

@Component({
  selector: 'ledger-portal-product-add',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);
  private productService = inject(ProductService);

  productTypes: ProductType[] = [
    { value: 'خرید اعتباری', label: 'خرید اعتباری' },
    { value: 'وام', label: 'وام' },
    { value: 'سپرده', label: 'سپرده' },
    { value: 'خدمات', label: 'خدمات' },
  ];

  productForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    englishName: ['', [Validators.required, Validators.maxLength(100)]],
    productType: ['', [Validators.required]],
    description: ['', [Validators.maxLength(500)]],
  });

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const request = {
        productCode: formValue.code || '',
        persianProductName: formValue.name || '',
        englishProductName: formValue.englishName || '',
        productType: formValue.productType || '',
        summary: formValue.description || '',
      };

      this.productService.createProduct(request).subscribe({
        next: () => {
          this.alert.open('محصول جدید با موفقیت ایجاد شد');
          this.router.navigate(['/console/product/list']);
        },
        error: () => {
          this.alert.open('خطا در ایجاد محصول');
        },
      });
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/console/product/list']);
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'این فیلد اجباری است';
    }
    if (field?.hasError('maxlength')) {
      const maxLength = field.errors?.['maxlength']?.requiredLength;
      return `حداکثر ${maxLength} کاراکتر مجاز است`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
}

