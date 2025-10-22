import { formatNumber, getCurrencySymbol } from '@angular/common';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

import { isMelliAccountNumber } from '@ledger-portal/shared/util/account-validator';
import { getBankNameByIban } from '@ledger-portal/shared/util/iban-validator';

export class CustomPlainValidators {
  static postalCode(value?: string | number) {
    const regex = new RegExp(/\b(?!(\d)\1{3})[13-9]{4}[1346-9][0-9]{5}\b/);
    return value ? regex.test(value.toString()) : false;
  }
}

export class CustomValidators {
  static readonly LIMITATIONS = {
    MAX_TEXT_LENGTH: 50,
    MAX_MEMO_LENGTH: 200,
    MAX_EMAIL_LENGTH: 100,
    MAX_PHONE_LENGTH: 15,
  };

  static exactLength(
    length: number,
    type: 'string' | 'number' = 'string'
  ): (ac: AbstractControl<string>) => ValidationErrors | null {
    return ac =>
      !ac.value || ac.value.length === length
        ? null
        : {
            exactLength: {
              actualLength: ac.value.length,
              requiredLength: length,
              type,
            },
          };
  }

  static minAmount(min: number, currency = 'IRR'): (ac: AbstractControl<string>) => ValidationErrors | null {
    return ac => (Validators.min(min)(ac) ? { minAmount: { actual: ac.value, min, currency } } : null);
  }

  static maxAmount(max: number, currency = 'IRR'): (ac: AbstractControl<string>) => ValidationErrors | null {
    return ac => (Validators.max(max)(ac) ? { maxAmount: { actual: ac.value, max, currency } } : null);
  }

  static url(ac: AbstractControl): any {
    const regex = new RegExp(/^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s/?.#-]+\.?)+(\/[^\s]*)?$/, 'i');
    return !ac.value || regex.test(ac.value) ? null : { url: true };
  }

  static noWhitespace(ac: AbstractControl): any {
    const regex = new RegExp(/\s/);
    return ac.value && !regex.test(ac.value) ? null : { whitespace: true };
  }

  static noWhitespaceAround(ac: AbstractControl): any {
    const value = ac.value;
    if (!value) return null;
    // Only apply to string values - convert to string if needed
    const strValue = typeof value === 'string' ? value : String(value);
    const regex = new RegExp(/^\S+(?: \S+)*$/);
    return regex.test(strValue) ? null : { noWhitespaceAround: true };
  }

  static noOnlyWhitespace(ac: AbstractControl): any {
    const value = ac.value;
    if (!value) return null;
    // Only apply to string values - convert to string if needed
    const strValue = typeof value === 'string' ? value : String(value);
    return strValue.trim() !== '' ? null : { emptyString: true };
  }

  static phone(ac: AbstractControl): any {
    const regex = new RegExp(/^[+]*[(]?[0-9]{1,4}[)]?[-\s\\./0-9]*$/);
    return !ac.value || regex.test(ac.value) ? null : { phone: true };
  }

  static mobileNumber(ac: AbstractControl): any {
    const regex = new RegExp(/^09[0-9]*$/);
    return !ac.value || (regex.test(ac.value) && ac.value.length == 11) ? null : { mobileNumber: true };
  }

  static latinLetters(ac: AbstractControl): any {
    const regex = new RegExp(/^[a-zA-Z'\s]*$/);
    return !ac.value || regex.test(ac.value) ? null : { latinLetters: true };
  }

  static noPersianLetters(ac: AbstractControl): any {
    const persianRegex = /[\u0600-\u06FF]/;
    return !ac.value || !persianRegex.test(ac.value) ? null : { noPersianLetters: true };
  }

  static password(ac: AbstractControl): any {
    const regex = new RegExp(
      /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,20}/
    );
    return !ac.value || regex.test(ac.value) ? null : { password: true };
  }

  static mustMatchPassword(
    controlName: string,
    matchingControlName: string
  ): (group: AbstractControl) => ValidationErrors | any {
    return (group: AbstractControl) => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);
      let error: ValidationErrors | null = null;
      if (matchingControl?.errors && !matchingControl.errors['matchPasswords']) {
        return error;
      }
      if (control?.value !== matchingControl?.value) {
        error = { matchPasswords: true };
      }
      matchingControl?.setErrors(error);
      return error;
    };
  }

  static nationalCode(ac: AbstractControl<string>) {
    if (!ac.value) return null;
    if (!/^\d{10}$/.test(ac.value)) {
      return { nationalCode: true };
    }
    const check = +ac.value[9];
    const sum =
      ac.value
        .split('')
        .slice(0, 9)
        .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;

    const isValid = sum < 2 ? check === sum : check + sum === 11;

    return isValid ? null : { nationalCode: true };
  }

  static nationalCodeOrCitizenCode(ac: AbstractControl<string>) {
    if (ac.value.length <= 10) {
      return CustomValidators.nationalCode(ac);
    }

    return ac.value.length < 17 ? null : { citizenCode: true };
  }

  static postalCode(ac: AbstractControl<string | number>) {
    return CustomPlainValidators.postalCode(ac.value) ? null : { postalCode: true };
  }

  static melliAccountNumber(ac: AbstractControl<string>) {
    return !ac.value || isMelliAccountNumber(ac.value) ? null : { invalid: true };
  }

  static iban(ac: AbstractControl<string>) {
    return !ac.value || getBankNameByIban(ac.value).isValid ? null : { invalid: true };
  }

  static bankResource(ac: AbstractControl<string>) {
    return ac.value && CustomValidators.melliAccountNumber(ac) && CustomValidators.iban(ac) ? { invalid: true } : null;
  }

  static getErrorMessage(
    control: AbstractControl | null,
    localeId: string,
    additionalCaseFn?: (error: string) => string | null
  ): any {
    for (const error in control?.errors) {
      if (additionalCaseFn && typeof additionalCaseFn === 'function' && additionalCaseFn(error)) {
        return additionalCaseFn(error);
      }
      switch (error) {
        case 'required':
          return $localize`تکمیل این فیلد الزامی است`;
        case 'email':
          return $localize`آدرس ایمیل وارد شده معتبر نیست`;
        case 'noWhitespace':
          return $localize`تکمیل این فیلد الزامی است`;
        case 'exactLength':
          return control?.errors?.['exactLength'].type === 'number'
            ? $localize`باید دقیقاً ${control?.errors?.['exactLength'].requiredLength} رقم وارد شود`
            : $localize`باید دقیقاً ${control?.errors?.['exactLength'].requiredLength} کاراکتر وارد شود`;
        case 'maxlength':
          return $localize`حداکثر طول مجاز ${control?.errors?.['maxlength'].requiredLength} کاراکتر است`;
        case 'minlength':
          return $localize`حداقل طول مورد نیاز ${control?.errors?.['minlength'].requiredLength} کاراکتر است`;
        case 'max':
          return $localize`مقدار وارد شده باید کمتر از ${control?.errors?.['max'].max} باشد`;
        case 'min':
          return $localize`مقدار وارد شده باید بیشتر از ${control?.errors?.['min'].min} باشد`;
        case 'maxAmount':
          return $localize`مبلغ وارد شده نباید از ${formatNumber(
            control?.errors?.['maxAmount'].max ?? 0,
            localeId
          )} ${getCurrencySymbol(control?.errors?.['maxAmount'].currency, 'wide', localeId)} بیشتر باشد`;
        case 'minAmount':
          return $localize`مبلغ وارد شده باید حداقل ${formatNumber(
            control?.errors?.['minAmount'].min ?? 0,
            localeId
          )} ${getCurrencySymbol(control?.errors?.['minAmount'].currency, 'wide', localeId)} باشد`;
        case 'phone':
          return $localize`شماره تلفن وارد شده معتبر نیست`;
        case 'mobileNumber':
          return $localize`شماره موبایل وارد شده معتبر نیست`;
        case 'url':
          return $localize`آدرس اینترنتی وارد شده معتبر نیست`;
        case 'password':
          return $localize`رمز عبور انتخاب شده امنیت کافی ندارد`;
        case 'noWhitespaceAround':
          return $localize`لطفاً فاصله‌های ابتدا و انتهای متن را حذف نمایید`;
        case 'matchPasswords':
          return $localize`رمزهای عبور وارد شده یکسان نیستند`;
        case 'nationalCode':
          return $localize`کد ملی وارد شده معتبر نیست`;
        case 'citizenCode':
          return $localize`کد فراگیر وارد شده معتبر نیست`;
        case 'latinLetters':
          return $localize`لطفاً فقط حروف لاتین استفاده نمایید`;
        default:
          return $localize`لطفاً یک مقدار معتبر وارد نمایید`;
      }
    }
  }
}

export class CertificateCancellationValidators {
  /**
   * Validates certificate count for cancellation
   * Must be a positive integer greater than 0
   */
  static certificateCount(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = parseInt(control.value, 10);
      if (isNaN(value) || value <= 0) {
        return { invalidCertificateCount: true };
      }

      return null;
    };
  }

  /**
   * Validates nominal value - must be a positive number
   */
  static nominalValue(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = parseFloat(control.value.replace(/,/g, ''));
      if (isNaN(value) || value <= 0) {
        return { invalidNominalValue: true };
      }

      return null;
    };
  }

  /**
   * Validates agreement number format
   * Should be alphanumeric with specific pattern
   */
  static agreementNumber(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const pattern = /^[A-Z0-9]{6,15}$/;
      if (!pattern.test(control.value)) {
        return { invalidAgreementNumber: true };
      }

      return null;
    };
  }

  /**
   * Validates cancellation amount - must be positive
   */
  static cancellationAmount(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = parseFloat(control.value.replace(/,/g, ''));
      if (isNaN(value) || value <= 0) {
        return { invalidCancellationAmount: true };
      }

      return null;
    };
  }

  /**
   * Validates penalty amount - optional but if provided must be positive
   */
  static penaltyAmount(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = parseFloat(control.value.replace(/,/g, ''));
      if (isNaN(value) || value < 0) {
        return { invalidPenaltyAmount: true };
      }

      return null;
    };
  }

  /**
   * Validates bank account number format
   */
  static bankAccount(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      // Remove spaces and dashes
      const cleanValue = control.value.replace(/[\s-]/g, '');

      // Should be numeric and between 10-20 digits
      const pattern = /^\d{10,20}$/;
      if (!pattern.test(cleanValue)) {
        return { invalidBankAccount: true };
      }

      return null;
    };
  }

  /**
   * Validates refund amount - must be positive
   */
  static refundAmount(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = parseFloat(control.value.replace(/,/g, ''));
      if (isNaN(value) || value <= 0) {
        return { invalidRefundAmount: true };
      }

      return null;
    };
  }

  /**
   * Validates remaining balance - optional but if provided must be non-negative
   */
  static remainingBalance(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = parseFloat(control.value.replace(/,/g, ''));
      if (isNaN(value) || value < 0) {
        return { invalidRemainingBalance: true };
      }

      return null;
    };
  }

  /**
   * Validates transaction ID format
   */
  static transactionId(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      // Transaction ID should be alphanumeric, 8-20 characters
      const pattern = /^[A-Z0-9]{8,20}$/;
      if (!pattern.test(control.value)) {
        return { invalidTransactionId: true };
      }

      return null;
    };
  }

  /**
   * Validates that cancellation date is not in the future
   */
  static cancellationDate(): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      // Normalize dates to compare only date parts (ignore time)
      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        return { futureDate: true };
      }

      return null;
    };
  }

  /**
   * Validates that processed date is not before cancellation date
   */
  static processedDate(cancellationDateControl: AbstractControl): (ac: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !cancellationDateControl?.value) return null;

      // Normalize dates to compare only date parts (ignore time)
      const processedDate = new Date(control.value);
      processedDate.setHours(0, 0, 0, 0);

      const cancellationDate = new Date(cancellationDateControl.value);
      cancellationDate.setHours(0, 0, 0, 0);

      if (processedDate < cancellationDate) {
        return { processedBeforeCancellation: true };
      }

      return null;
    };
  }

  /**
   * Custom error messages for certificate cancellation validators
   */
  static getErrorMessage(control: AbstractControl | null): string | undefined {
    if (!control?.errors) return undefined;

    for (const error in control.errors) {
      switch (error) {
        case 'invalidCertificateCount':
          return 'تعداد گواهی وارد شده باید یک عدد صحیح مثبت باشد';
        case 'invalidNominalValue':
          return 'ارزش اسمی وارد شده باید یک عدد مثبت باشد';
        case 'invalidAgreementNumber':
          return 'شماره توافق‌نامه باید بین 6 تا 15 کاراکتر (حروف و اعداد) باشد';
        case 'invalidCancellationAmount':
          return 'مبلغ ابطال وارد شده باید یک عدد مثبت باشد';
        case 'invalidPenaltyAmount':
          return 'مبلغ جریمه وارد شده نمی‌تواند منفی باشد';
        case 'invalidBankAccount':
          return 'شماره حساب بانکی باید بین 10 تا 20 رقم باشد';
        case 'invalidRefundAmount':
          return 'مبلغ بازپرداخت وارد شده باید یک عدد مثبت باشد';
        case 'invalidRemainingBalance':
          return 'موجودی باقی‌مانده نمی‌تواند منفی باشد';
        case 'invalidTransactionId':
          return 'شناسه تراکنش باید بین 8 تا 20 کاراکتر (حروف و اعداد) باشد';
        case 'futureDate':
          return 'تاریخ انتخاب شده نمی‌تواند در آینده باشد';
        case 'processedBeforeCancellation':
          return 'تاریخ پردازش نمی‌تواند قبل از تاریخ ابطال باشد';
        default:
          // Fall back to default CustomValidators error messages
          return CustomValidators.getErrorMessage(control, 'fa');
      }
    }

    return undefined;
  }
}
