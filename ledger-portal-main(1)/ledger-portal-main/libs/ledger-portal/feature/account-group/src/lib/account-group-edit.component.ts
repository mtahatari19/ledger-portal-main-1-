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

import { AccountGroup } from './account-group-list.component';

export interface GroupType {
  value: string;
  label: string;
}

export interface Status {
  value: string;
  label: string;
}

@Component({
  selector: 'ledger-portal-account-group-edit',
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
  templateUrl: './account-group-edit.component.html',
  styleUrl: './account-group-edit.component.scss',
})
export class AccountGroupEditComponent implements OnInit {
  private alert = inject(AlertService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  accountGroupId: string | null = null;
  isEditMode = false;

  groupTypes: GroupType[] = [
    { value: 'بالای خط', label: 'بالای خط' },
    { value: 'زیر خط', label: 'زیر خط' },
  ];

  statuses: Status[] = [
    { value: 'active', label: 'فعال' },
    { value: 'inactive', label: 'غیرفعال' },
  ];

  accountGroupForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    englishName: ['', [Validators.required, Validators.maxLength(100)]],
    groupType: ['', [Validators.required]],
    status: ['active', [Validators.required]],
    description: ['', [Validators.maxLength(500)]],
  });

  // Mock data - In real application, this would come from a service
  private mockAccountGroups: AccountGroup[] = [
    {
      id: '1',
      code: 'ACC_ASSET',
      name: 'دارایی ها',
      englishName: 'ASSETS',
      groupType: 'بالای خط',
      lastUpdate: '۱۴۰۴/۰۷/۲۲ - ۱۴:۳۲',
      status: 'active',
    },
    {
      id: '2',
      code: 'ACC_LIAB',
      name: 'بدهی ها',
      englishName: 'LIABILITIES',
      groupType: 'زیر خط',
      lastUpdate: '۱۴۰۴/۰۷/۲۱ - ۱۶:۳۰',
      status: 'active',
    },
    {
      id: '3',
      code: 'ACC_EQUITY',
      name: 'سرمایه',
      englishName: 'ACC_EQUITY',
      groupType: 'زیر خط',
      lastUpdate: '۱۴۰۴/۰۷/۲۰ - ۱۰:۰۰',
      status: 'active',
    },
    {
      id: '4',
      code: 'ACC_REV',
      name: 'درآمدها',
      englishName: 'ACC_REV',
      groupType: 'زیر خط',
      lastUpdate: '۱۴۰۴/۰۷/۱۷ - ۱۸:۵۲',
      status: 'inactive',
    },
    {
      id: '5',
      code: 'ACC_EXP',
      name: 'هزینه ها',
      englishName: 'ACC_EXP',
      groupType: 'بالای خط',
      lastUpdate: '۱۴۰۴/۰۷/۱۷ - ۱۲:۰۱',
      status: 'inactive',
    },
    {
      id: '6',
      code: 'ACC_EXP',
      name: 'بدهی ها',
      englishName: 'LIABILITIES',
      groupType: 'بالای خط',
      lastUpdate: '۱۴۰۴/۰۷/۱۵ - ۱۴:۲۰',
      status: 'active',
    },
  ];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountGroupId = params['id'];
      if (this.accountGroupId) {
        this.isEditMode = true;
        this.loadAccountGroupData(this.accountGroupId);
      }
    });
  }

  private loadAccountGroupData(id: string) {
    const accountGroup = this.mockAccountGroups.find(item => item.id === id);

    if (accountGroup) {
      this.accountGroupForm.patchValue({
        code: accountGroup.code,
        name: accountGroup.name,
        englishName: accountGroup.englishName,
        groupType: accountGroup.groupType,
        status: accountGroup.status,
        description: '',
      });
    } else {
      this.router.navigate(['/console/account-group/list']);
    }
  }

  onSubmit() {
    if (this.accountGroupForm.valid) {
      const formData = this.accountGroupForm.value;

      if (this.isEditMode) {
        this.alert.open('تغییر حساب با موفقیت انجام شد.');
        this.router.navigate(['/console/basic-information']);
      } else {
        console.log('Creating account group:', formData);
      }
      this.goBack();
    } else {
      Object.keys(this.accountGroupForm.controls).forEach(key => {
        this.accountGroupForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack() {
    this.router.navigate(['/console']);
  }

  getFieldError(fieldName: string) {
    const field = this.accountGroupForm.get(fieldName);
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
    const field = this.accountGroupForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getPageTitle() {
    return this.isEditMode ? 'ویرایش گروه حساب' : 'افزودن گروه حساب';
  }

  getSubmitButtonText() {
    return this.isEditMode ? 'بروزرسانی گروه حساب' : 'افزودن گروه حساب';
  }
}
