import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';

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
  readonly form: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {
    this.form = this.fb.group({
      code: [''],
      nameFa: [''],
      nameEn: [''],
      status: ['active'],
      features: [''],
      description: [''],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: Integrate with API once available
    // For now, just log the payload
    // eslint-disable-next-line no-console
    console.log('Product type payload', this.form.value);
  }

  goBack(): void {
    this.location.back();
  }
}


