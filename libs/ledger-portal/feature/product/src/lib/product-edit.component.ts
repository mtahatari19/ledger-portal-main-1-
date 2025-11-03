import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { ProductService } from '@ledger-portal/data/product';

interface ProductType {
  value: string;
  label: string;
}

interface Status {
  value: string;
  label: string;
}

@Component({
  selector: 'ledger-portal-product-edit',
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
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  private alert = inject(AlertService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  productId: number | null = null;

  productTypes: ProductType[] = [
    { value: 'خرید اعتباری', label: 'خرید اعتباری' },
    { value: 'وام', label: 'وام' },
    { value: 'سپرده', label: 'سپرده' },
    { value: 'خدمات', label: 'خدمات' },
  ];

  statuses: Status[] = [
    { value: 'ACTIVE', label: 'فعال' },
    { value: 'INACTIVE', label: 'غیرفعال' },
  ];

  productForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    englishName: ['', [Validators.required, Validators.maxLength(100)]],
    productType: ['', [Validators.required]],
    status: ['ACTIVE', [Validators.required]],
    description: ['', [Validators.maxLength(500)]],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productId = Number(id);
        this.loadProductData(this.productId);
      }
    });
  }

  private loadProductData(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: product => {
        this.productForm.patchValue({
          code: product.productCode,
          name: product.persianProductName,
          englishName: product.englishProductName,
          productType: product.productType,
          status: product.status,
          description: product.summary || '',
        });
      },
      error: () => {
        this.alert.open('خطا در بارگذاری اطلاعات محصول');
        this.router.navigate(['/console/product/list']);
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.valid && this.productId) {
      const formValue = this.productForm.value;
      const request = {
        productCode: formValue.code || '',
        persianProductName: formValue.name || '',
        englishProductName: formValue.englishName || '',
        productType: formValue.productType || '',
        summary: formValue.description || '',
        status: formValue.status || 'ACTIVE',
      };

      this.productService.updateProduct(this.productId, request).subscribe({
        next: () => {
          this.alert.open('محصول با موفقیت بروزرسانی شد');
          this.router.navigate(['/console/product/list']);
        },
        error: () => {
          this.alert.open('خطا در بروزرسانی محصول');
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

