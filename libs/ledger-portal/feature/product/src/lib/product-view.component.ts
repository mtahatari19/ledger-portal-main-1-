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
  selector: 'ledger-portal-product-view',
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
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent implements OnInit {
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
    code: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]],
    name: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)]],
    englishName: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)]],
    productType: [{ value: '', disabled: true }, [Validators.required]],
    status: [{ value: 'ACTIVE', disabled: true }, [Validators.required]],
    description: [{ value: '', disabled: true }, [Validators.maxLength(500)]],
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
        this.router.navigate(['/console/product/list']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/console/product/list']);
  }
}

