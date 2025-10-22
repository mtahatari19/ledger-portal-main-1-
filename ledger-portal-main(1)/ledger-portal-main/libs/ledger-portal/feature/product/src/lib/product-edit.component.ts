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

import { Product } from './product-list.component';

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

  productId: string | null = null;
  isEditMode = false;

  productTypes: ProductType[] = [
    { value: 'خرید اعتباری', label: 'خرید اعتباری' },
    { value: 'وام', label: 'وام' },
    { value: 'سپرده', label: 'سپرده' },
    { value: 'خدمات', label: 'خدمات' },
  ];

  statuses: Status[] = [
    { value: 'active', label: 'فعال' },
    { value: 'inactive', label: 'غیرفعال' },
  ];

  productForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    englishName: ['', [Validators.required, Validators.maxLength(100)]],
    productType: ['', [Validators.required]],
    status: ['active', [Validators.required]],
    description: ['', [Validators.maxLength(500)]],
  });

  private mockProducts: Product[] = [
    {
      id: '1',
      code: '1001',
      name: 'یارانه کالایی',
      englishName: 'Commodity Subsidy',
      productType: 'خرید اعتباری',
      description: 'محصول یارانه کالایی',
      status: 'active',
    },
    {
      id: '2',
      code: '1002',
      name: 'طرح یسنا',
      englishName: 'Yasna Plan',
      productType: 'خرید اعتباری',
      description: 'طرح یسنا برای خرید اعتباری',
      status: 'active',
    },
    {
      id: '3',
      code: '1003',
      name: 'وام قرض الحسنه',
      englishName: 'Interest-Free Loan',
      productType: 'وام',
      description: 'وام قرض الحسنه',
      status: 'inactive',
    },
  ];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.isEditMode = true;
        this.loadProductData(this.productId);
      }
    });
  }

  private loadProductData(id: string) {
    const product = this.mockProducts.find(item => item.id === id);

    if (product) {
      this.productForm.patchValue({
        code: product.code,
        name: product.name,
        englishName: product.englishName,
        productType: product.productType,
        status: product.status,
        description: product.description,
      });
    } else {
      this.router.navigate(['/console/product/list']);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      if (this.isEditMode) {
        this.alert.open('تغییر محصول با موفقیت انجام شد.');
        this.router.navigate(['/console/product/list']);
      } else {
        console.log('Creating product:', formData);
      }
      this.goBack();
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack() {
    this.router.navigate(['/console/product/list']);
  }

  getFieldError(fieldName: string) {
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

  isFieldInvalid(fieldName: string) {
    const field = this.productForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getPageTitle() {
    return this.isEditMode ? 'ویرایش محصول' : 'افزودن محصول';
  }

  getSubmitButtonText() {
    return this.isEditMode ? 'بروزرسانی محصول' : 'افزودن محصول';
  }
}

