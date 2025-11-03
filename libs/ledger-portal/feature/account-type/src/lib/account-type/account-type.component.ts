import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule, MatChipListboxChange } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { AccountTypeService, CreateAccountTypeRequest } from '@ledger-portal/data/account-type';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { OverlaySpinnerDirective } from '@ledger-portal/shared/ui/spinner';
import { finalize } from 'rxjs';

// Interfaces
export interface SelectOption {
  value: string;
  label: string;
}

export interface Currency {
  id: string;
  code: string;
  nameFa: string;
  nameEn: string;
}

export interface OrganizationalUnit {
  id: string;
  code: string;
  name: string;
}

export interface LimitEntity {
  id: string;
  name: string;
}

export interface Limitation {
  id: string;
  limitType: string;
  limitTypeName: string;
  relationType: string;
  relationTypeName: string;
  entities: LimitEntity[];
  description: string;
}

@Component({
  selector: 'ledger-portal-account-type',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    LedgerPortalSharedUiBreadcrumbComponent,
    OverlaySpinnerDirective,
    SvgIconTypeDirective,
  ],
  templateUrl: './account-type.component.html',
  styleUrl: './account-type.component.scss',
})
export class AccountTypeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alert = inject(AlertService);
  private accountTypeService = inject(AccountTypeService);

  // Step Management
  currentStep = 1;
  totalSteps = 4;

  steps = [
    { number: 1, title: 'اطلاعات عمومی', icon: 'info' },
    { number: 2, title: 'ارزهای مجاز', icon: 'attach_money' },
    { number: 3, title: 'واحدهای سازمانی', icon: 'business' },
    { number: 4, title: 'محدودیت‌ها', icon: 'rule' },
  ];

  // Form Groups
  generalInfoForm!: FormGroup;
  currenciesForm!: FormGroup;
  orgUnitsForm!: FormGroup;
  limitationsForm!: FormGroup;

  // Dropdown Options
  accountGroups: SelectOption[] = [
    { value: 'asset', label: 'دارایی' },
    { value: 'liability', label: 'بدهی' },
    { value: 'equity', label: 'حقوق صاحبان سهام' },
    { value: 'income', label: 'درآمد' },
    { value: 'expense', label: 'هزینه' },
  ];

  subsystems: SelectOption[] = [
    { value: 'subsidy', label: 'یارانه' },
    { value: 'credit', label: 'تسهیلات اعتباری' },
    { value: 'general', label: 'عمومی' },
  ];

  productTypes: SelectOption[] = [
    { value: 'commodity-subsidy', label: 'یارانه کالایی' },
    { value: 'credit-facility', label: 'تسهیلات اعتباری' },
    { value: 'normal-plan', label: 'طرح عادی' },
  ];

  relationTypes: SelectOption[] = [
    { value: 'commitment', label: 'تعهد' },
    { value: 'prepayment', label: 'پیش‌دریافت' },
    { value: 'receivable', label: 'دریافتنی' },
    { value: 'commission', label: 'کارمزد' },
  ];

  partyTypes: SelectOption[] = [
    { value: 'merchant', label: 'پذیرنده' },
    { value: 'customer', label: 'مشتری' },
    { value: 'supplier', label: 'تأمین‌کننده' },
    { value: 'vendor', label: 'فروشنده' },
  ];

  subAccountTypes: SelectOption[] = [
    { value: 'none', label: 'ندارد' },
    { value: 'item', label: 'کالا' },
    { value: 'item-group', label: 'گروه کالا' },
  ];

  // Currencies List
  availableCurrencies: Currency[] = [
    { id: '1', code: 'IRR', nameFa: 'ریال ایران', nameEn: 'Iranian Rial' },
    { id: '2', code: 'USD', nameFa: 'دلار آمریکا', nameEn: 'US Dollar' },
    { id: '3', code: 'EUR', nameFa: 'یورو', nameEn: 'Euro' },
    { id: '4', code: 'GBP', nameFa: 'پوند انگلیس', nameEn: 'British Pound' },
  ];

  // Organizational Units List
  availableOrgUnits: OrganizationalUnit[] = [
    { id: '1', code: 'HQ', name: 'دفتر مرکزی' },
    { id: '2', code: 'BR01', name: 'شعبه تهران' },
    { id: '3', code: 'BR02', name: 'شعبه مشهد' },
    { id: '4', code: 'BR03', name: 'شعبه اصفهان' },
  ];

  // Limitation Types
  limitEntityTypes: SelectOption[] = [
    { value: 'item', label: 'کالا' },
    { value: 'item-group', label: 'گروه کالا' },
    { value: 'transaction-code', label: 'کد تراکنش' },
    { value: 'user-group', label: 'گروه کاربری' },
  ];

  relationTypeOptions: SelectOption[] = [
    { value: 'allowed', label: 'مجاز' },
    { value: 'not-allowed', label: 'غیرمجاز' },
  ];

  // Available entities based on limit type (mock data)
  availableEntities: Record<string, LimitEntity[]> = {
    item: [
      { id: '1', name: 'برنج' },
      { id: '2', name: 'روغن' },
      { id: '3', name: 'شکر' },
    ],
    'item-group': [
      { id: '1', name: 'مواد غذایی' },
      { id: '2', name: 'لوازم بهداشتی' },
    ],
    'transaction-code': [
      { id: '1', name: 'خرید' },
      { id: '2', name: 'فروش' },
    ],
    'user-group': [
      { id: '1', name: 'مدیران' },
      { id: '2', name: 'کارشناسان' },
    ],
  };

  // Selected currencies and org units
  selectedCurrencies: Currency[] = [];
  selectedOrgUnits: OrganizationalUnit[] = [];
  limitations: Limitation[] = [];
  creatingAccountType = false;

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void {
    // Step 1: General Information
    this.generalInfoForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(50)]],
      accountingCode1: ['', [Validators.maxLength(50)]],
      accountingCode2: ['', [Validators.maxLength(50)]],
      nameFa: ['', [Validators.required, Validators.maxLength(200)]],
      nameEn: ['', [Validators.maxLength(200)]],
      accountGroup: ['', [Validators.required]],
      subsystem: ['', [Validators.required]],
      productType: [''],
      relationType: [''],
      partyType: [''],
      subAccountType: ['none'],
      status: [true],
      description: ['', [Validators.maxLength(1000)]],
    });

    // Step 2: Currencies
    this.currenciesForm = this.fb.group({
      currencyType: ['fixed', [Validators.required]],
      selectedCurrencyIds: [[], [Validators.required]],
      defaultCurrency: ['', [Validators.required]],
    });

    // Step 3: Organizational Units
    this.orgUnitsForm = this.fb.group({
      orgUnitType: ['fixed', [Validators.required]],
      selectedOrgUnitIds: [[], [Validators.required]],
      defaultOrgUnit: ['', [Validators.required]],
    });

    // Step 4: Limitations
    this.limitationsForm = this.fb.group({
      limitType: [''],
      relationType: ['allowed'],
      selectedEntityIds: [[]],
      limitDescription: [''],
    });

    // Listen to currency type changes
    this.currenciesForm.get('currencyType')?.valueChanges.subscribe(type => {
      this.onCurrencyTypeChange(type);
    });

    // Listen to org unit type changes
    this.orgUnitsForm.get('orgUnitType')?.valueChanges.subscribe(type => {
      this.onOrgUnitTypeChange(type);
    });
  }

  // Currency Selection Methods
  onCurrencyTypeChange(type: string): void {
    const selectedIds = this.currenciesForm.get('selectedCurrencyIds');
    const defaultCurrency = this.currenciesForm.get('defaultCurrency');

    if (type === 'fixed') {
      selectedIds?.clearValidators();
      selectedIds?.setValidators([Validators.required]);
    } else {
      selectedIds?.setValidators([Validators.required]);
    }
    selectedIds?.updateValueAndValidity();

    // Reset selections
    this.selectedCurrencies = [];
    selectedIds?.setValue([]);
    defaultCurrency?.setValue('');
  }

  toggleCurrencySelection(currency: Currency): void {
    const index = this.selectedCurrencies.findIndex(c => c.id === currency.id);
    const currencyType = this.currenciesForm.get('currencyType')?.value;

    if (currencyType === 'fixed') {
      // Only allow one currency for fixed type
      this.selectedCurrencies = [currency];
      this.currenciesForm.patchValue({
        selectedCurrencyIds: [currency.id],
        defaultCurrency: currency.id,
      });
    } else {
      if (index === -1) {
        this.selectedCurrencies.push(currency);
      } else {
        this.selectedCurrencies.splice(index, 1);
        // Reset default if removed
        if (this.currenciesForm.get('defaultCurrency')?.value === currency.id) {
          this.currenciesForm.patchValue({ defaultCurrency: '' });
        }
      }
      this.currenciesForm.patchValue({
        selectedCurrencyIds: this.selectedCurrencies.map(c => c.id),
      });
    }
  }

  isCurrencySelected(currency: Currency): boolean {
    return this.selectedCurrencies.some(c => c.id === currency.id);
  }

  onCurrencyChipChange(event: MatChipListboxChange): void {
    const currencyType = this.currenciesForm.get('currencyType')?.value;
    const selectedIds = event.value;

    if (currencyType === 'fixed') {
      // For fixed type, only keep the last selected currency
      const lastSelectedId = Array.isArray(selectedIds) ? selectedIds[selectedIds.length - 1] : selectedIds;
      const currency = this.availableCurrencies.find(c => c.id === lastSelectedId);
      if (currency) {
        this.selectedCurrencies = [currency];
        this.currenciesForm.patchValue({
          selectedCurrencyIds: [currency.id],
          defaultCurrency: currency.id,
        });
      }
    } else {
      // For multiple type, allow multiple selections
      const ids = Array.isArray(selectedIds) ? selectedIds : [selectedIds];
      this.selectedCurrencies = this.availableCurrencies.filter(c => ids.includes(c.id));
      this.currenciesForm.patchValue({
        selectedCurrencyIds: ids,
      });

      // Reset default currency if it's no longer in the selection
      const defaultCurrency = this.currenciesForm.get('defaultCurrency')?.value;
      if (defaultCurrency && !ids.includes(defaultCurrency)) {
        this.currenciesForm.patchValue({ defaultCurrency: '' });
      }
    }
  }

  // Organizational Unit Selection Methods
  onOrgUnitTypeChange(type: string): void {
    const selectedIds = this.orgUnitsForm.get('selectedOrgUnitIds');
    const defaultUnit = this.orgUnitsForm.get('defaultOrgUnit');

    if (type === 'fixed') {
      selectedIds?.clearValidators();
      selectedIds?.setValidators([Validators.required]);
    } else {
      selectedIds?.setValidators([Validators.required]);
    }
    selectedIds?.updateValueAndValidity();

    // Reset selections
    this.selectedOrgUnits = [];
    selectedIds?.setValue([]);
    defaultUnit?.setValue('');
  }

  toggleOrgUnitSelection(unit: OrganizationalUnit): void {
    const index = this.selectedOrgUnits.findIndex(u => u.id === unit.id);
    const unitType = this.orgUnitsForm.get('orgUnitType')?.value;

    if (unitType === 'fixed') {
      // Only allow one unit for fixed type
      this.selectedOrgUnits = [unit];
      this.orgUnitsForm.patchValue({
        selectedOrgUnitIds: [unit.id],
        defaultOrgUnit: unit.id,
      });
    } else {
      if (index === -1) {
        this.selectedOrgUnits.push(unit);
      } else {
        this.selectedOrgUnits.splice(index, 1);
        // Reset default if removed
        if (this.orgUnitsForm.get('defaultOrgUnit')?.value === unit.id) {
          this.orgUnitsForm.patchValue({ defaultOrgUnit: '' });
        }
      }
      this.orgUnitsForm.patchValue({
        selectedOrgUnitIds: this.selectedOrgUnits.map(u => u.id),
      });
    }
  }

  isOrgUnitSelected(unit: OrganizationalUnit): boolean {
    return this.selectedOrgUnits.some(u => u.id === unit.id);
  }

  onOrgUnitChipChange(event: MatChipListboxChange): void {
    const unitType = this.orgUnitsForm.get('orgUnitType')?.value;
    const selectedIds = event.value;

    if (unitType === 'fixed') {
      // For fixed type, only keep the last selected unit
      const lastSelectedId = Array.isArray(selectedIds) ? selectedIds[selectedIds.length - 1] : selectedIds;
      const unit = this.availableOrgUnits.find(u => u.id === lastSelectedId);
      if (unit) {
        this.selectedOrgUnits = [unit];
        this.orgUnitsForm.patchValue({
          selectedOrgUnitIds: [unit.id],
          defaultOrgUnit: unit.id,
        });
      }
    } else {
      // For multiple type, allow multiple selections
      const ids = Array.isArray(selectedIds) ? selectedIds : [selectedIds];
      this.selectedOrgUnits = this.availableOrgUnits.filter(u => ids.includes(u.id));
      this.orgUnitsForm.patchValue({
        selectedOrgUnitIds: ids,
      });

      // Reset default unit if it's no longer in the selection
      const defaultUnit = this.orgUnitsForm.get('defaultOrgUnit')?.value;
      if (defaultUnit && !ids.includes(defaultUnit)) {
        this.orgUnitsForm.patchValue({ defaultOrgUnit: '' });
      }
    }
  }

  // Limitations Methods
  getEntitiesForLimitType(limitType: string): LimitEntity[] {
    return this.availableEntities[limitType] || [];
  }

  addLimitation(): void {
    if (
      !this.limitationsForm.get('limitType')?.value ||
      !this.limitationsForm.get('selectedEntityIds')?.value?.length
    ) {
      this.alert.open('لطفاً نوع محدودیت و موجودیت‌ها را انتخاب کنید.');
      return;
    }

    const limitType = this.limitationsForm.get('limitType')?.value;
    const relationType = this.limitationsForm.get('relationType')?.value;
    const entityIds = this.limitationsForm.get('selectedEntityIds')?.value || [];
    const description = this.limitationsForm.get('limitDescription')?.value || '';

    const limitTypeName = this.limitEntityTypes.find(t => t.value === limitType)?.label || '';
    const relationTypeName = this.relationTypeOptions.find(t => t.value === relationType)?.label || '';

    const availableEntities = this.getEntitiesForLimitType(limitType);
    const selectedEntities = availableEntities.filter(e => entityIds.includes(e.id));

    const limitation: Limitation = {
      id: Date.now().toString(),
      limitType,
      limitTypeName,
      relationType,
      relationTypeName,
      entities: selectedEntities,
      description,
    };

    this.limitations.push(limitation);

    // Reset form
    this.limitationsForm.patchValue({
      limitType: '',
      relationType: 'allowed',
      selectedEntityIds: [],
      limitDescription: '',
    });
  }

  removeLimitation(id: string): void {
    this.limitations = this.limitations.filter(l => l.id !== id);
  }

  // Step Navigation
  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  nextStep(): void {
    if (this.canProceedToNextStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      this.markCurrentFormAsTouched();
      this.alert.open('لطفاً تمام فیلدهای اجباری را تکمیل کنید.');
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.generalInfoForm.valid;
      case 2:
        return this.currenciesForm.valid;
      case 3:
        return this.orgUnitsForm.valid;
      case 4:
        return true; // Step 4 has no required fields
      default:
        return false;
    }
  }

  markCurrentFormAsTouched(): void {
    switch (this.currentStep) {
      case 1:
        Object.keys(this.generalInfoForm.controls).forEach(key => {
          this.generalInfoForm.get(key)?.markAsTouched();
        });
        break;
      case 2:
        Object.keys(this.currenciesForm.controls).forEach(key => {
          this.currenciesForm.get(key)?.markAsTouched();
        });
        break;
      case 3:
        Object.keys(this.orgUnitsForm.controls).forEach(key => {
          this.orgUnitsForm.get(key)?.markAsTouched();
        });
        break;
    }
  }

  goToStep(stepNumber: number): void {
    // Allow navigation to previous steps or current step
    if (stepNumber <= this.currentStep) {
      this.currentStep = stepNumber;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSubmit(): void {
    if (this.generalInfoForm.invalid || this.currenciesForm.invalid || this.orgUnitsForm.invalid) {
      this.alert.open('لطفاً تمام فیلدهای اجباری را تکمیل کنید.');
      return;
    }

    const generalInfo = this.generalInfoForm.value;
    const currencies = this.currenciesForm.value;
    const orgUnits = this.orgUnitsForm.value;
    const firstLimitation = this.limitations.length > 0 ? this.limitations[0] : null;

    const mapCurrencyType = (type: string): string => {
      if (type === 'fixed') return 'ONE';
      if (type === 'multiple') return 'MULTIPLE';
      return 'ONE';
    };

    const mapUnitType = (type: string): string => {
      if (type === 'fixed') return 'ONE';
      if (type === 'multiple') return 'MULTIPLE';
      return 'ONE';
    };

    const mapSubsystem = (subsystem: string): string => {
      return subsystem.toUpperCase();
    };

    const mapPersonType = (personType: string): string => {
      if (personType === 'customer') return 'CUSTOMER';
      if (personType === 'merchant') return 'MERCHANT';
      if (personType === 'supplier') return 'SUPPLIER';
      if (personType === 'vendor') return 'VENDOR';
      return personType.toUpperCase();
    };

    const mapSubAccount = (subAccount: string): string => {
      if (subAccount === 'none') return 'DONT_HAVE';
      if (subAccount === 'item') return 'ITEM';
      if (subAccount === 'item-group') return 'ITEM_GROUP';
      return 'DONT_HAVE';
    };

    const mapRestrictionType = (limitType: string): string => {
      if (limitType === 'item') return 'GOODS';
      if (limitType === 'item-group') return 'GOODS_GROUP';
      if (limitType === 'transaction-code') return 'TRANSACTION_CODE';
      if (limitType === 'user-group') return 'USER_GROUP';
      return 'GOODS';
    };

    const mapRelationType = (relationType: string): string => {
      if (relationType === 'allowed') return 'ALLOWED';
      if (relationType === 'not-allowed') return 'NOT_ALLOWED';
      return 'ALLOWED';
    };

    const accountGroupValue = generalInfo.accountGroup || '';
    const accountGroupId = accountGroupValue ? parseInt(accountGroupValue) || 0 : 0;
    const accountGroupIds = accountGroupId > 0 ? [accountGroupId] : [];

    const productTypeId = generalInfo.productType ? parseInt(generalInfo.productType) || 0 : 0;
    const accountingRelationTypeId = generalInfo.relationType ? parseInt(generalInfo.relationType) || 0 : 0;

    const selectedCurrencyIds = this.selectedCurrencies.map(c => parseInt(c.id)).filter(id => !isNaN(id));
    const defaultCurrencyId = currencies.defaultCurrency
      ? parseInt(currencies.defaultCurrency)
      : selectedCurrencyIds.length > 0
        ? selectedCurrencyIds[0]
        : 0;

    const units = this.selectedOrgUnits.map(u => u.code || u.id);
    const defaultUnit = orgUnits.defaultOrgUnit || (units.length > 0 ? units[0] : 'MAIN_BRANCH');

    const selectedRestrictionId =
      firstLimitation && firstLimitation.entities.length > 0 ? parseInt(firstLimitation.entities[0].id) || 0 : 0;

    const request: CreateAccountTypeRequest = {
      accountTypeCode: generalInfo.code || '',
      accountingCode1: generalInfo.accountingCode1 || '',
      accountingCode2: generalInfo.accountingCode2 || '',
      persianName: generalInfo.nameFa || '',
      englishName: generalInfo.nameEn || '',
      accountGroupIds: accountGroupIds,
      subsystem: mapSubsystem(generalInfo.subsystem || 'GENERAL'),
      productTypeId: productTypeId,
      accountingRelationTypeId: accountingRelationTypeId,
      personType: mapPersonType(generalInfo.partyType || 'CUSTOMER'),
      subAccount: mapSubAccount(generalInfo.subAccountType || 'none'),
      description: generalInfo.description || '',
      status: generalInfo.status ? 'ACTIVE' : 'INACTIVE',
      currencyType: mapCurrencyType(currencies.currencyType || 'fixed'),
      selectedCurrencyIds: selectedCurrencyIds,
      defaultCurrencyId: defaultCurrencyId,
      unitType: mapUnitType(orgUnits.orgUnitType || 'fixed'),
      units: units.length > 0 ? units : ['MAIN_BRANCH'],
      defaultUnit: defaultUnit,
      restrictionType: firstLimitation ? mapRestrictionType(firstLimitation.limitType) : 'GOODS',
      relationType: firstLimitation ? mapRelationType(firstLimitation.relationType) : 'ALLOWED',
      selectedRestrictionId: selectedRestrictionId,
      restrictionDescription: firstLimitation ? firstLimitation.description || '' : '',
    };

    this.creatingAccountType = true;
    this.accountTypeService
      .createAccountType(request)
      .pipe(finalize(() => (this.creatingAccountType = false)))
      .subscribe({
        next: () => {
          this.alert.open('نوع حساب با موفقیت ثبت شد.');
          this.router.navigate(['/console/basic-information']);
        },
        error: () => {
          this.alert.open('خطا در ایجاد نوع حساب');
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/console/basic-information']);
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.hasError('required')) {
      return 'این فیلد اجباری است';
    }
    if (field?.hasError('maxlength')) {
      const maxLength = field.errors?.['maxlength']?.requiredLength;
      return `حداکثر ${maxLength} کاراکتر مجاز است`;
    }
    return '';
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
}
