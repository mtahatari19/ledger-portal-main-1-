import { FormControl } from '@angular/forms';
import { CustomValidators } from './validators';

describe('CustomValidators', () => {
  const validators = CustomValidators;

  it('should return error when value length is not equal to the specified length ', () => {
    const formControl = new FormControl('1234', [validators.exactLength(5)]);
    expect(formControl.errors?.['exactLength']).toBeTruthy();
  });

  it('should not return error when value length is equal to the specified length ', () => {
    const formControl = new FormControl('12345', [validators.exactLength(5)]);
    expect(formControl.errors?.['exactLength']).not.toBeTruthy();
  });

  it('should not return error when #url is null', () => {
    const formControl = new FormControl('', [validators.url]);
    expect(formControl.errors?.['url']).not.toBe(true);
  });

  it('should not return error when #url is valid', () => {
    const formControl = new FormControl('', [validators.url]);
    formControl.setValue('http://google.com');
    expect(formControl.errors?.['url']).not.toBe(true);
    formControl.setValue('https://www.google.com');
    expect(formControl.errors?.['url']).not.toBe(true);
  });

  it('should return error when #url is not valid', () => {
    const formControl = new FormControl('', [validators.url]);
    formControl.setValue('google.com');
    expect(formControl.errors?.['url']).toBe(true);
    formControl.setValue('www.google.com');
    expect(formControl.errors?.['url']).toBe(true);
  });

  it('should return error when #whitepace is only entry', () => {
    const formControl = new FormControl('', [validators.noWhitespace]);
    formControl.setValue('        ');
    expect(formControl.errors?.['whitespace']).toBe(true);
  });

  it('should not return error when #phone number is valid', () => {
    const formControl = new FormControl('', [validators.phone]);
    expect(formControl.errors?.['phone']).not.toBe(true);
  });

  it('should not return error when #phone number is valid', () => {
    const formControl = new FormControl('', [validators.phone]);
    formControl.setValue('0912 345 67 89');
    expect(formControl.errors?.['phone']).not.toBe(true);
    formControl.setValue('+(98) 912 345 67 89');
    expect(formControl.errors?.['phone']).not.toBe(true);
  });

  it('should return error when #phone number is not valid', () => {
    const formControl = new FormControl('', [validators.phone]);
    formControl.setValue('phone');
    expect(formControl.errors?.['phone']).toBe(true);
    formControl.setValue('0912 $%');
    expect(formControl.errors?.['phone']).toBe(true);
  });

  it('should not return error when #latin letters is null', () => {
    const formControl = new FormControl('', [validators.latinLetters]);
    expect(formControl.errors?.['latinLetters']).not.toBe(true);
  });

  it('should not return error when #latin letters is valid', () => {
    const formControl = new FormControl('', [validators.latinLetters]);
    formControl.setValue("O'Donnel Junior");
    expect(formControl.errors?.['latinLetters']).not.toBe(true);
  });

  it('should return error when #latin letters is not valid', () => {
    const formControl = new FormControl('', [validators.latinLetters]);
    formControl.setValue('Name 123');
    expect(formControl.errors?.['latinLetters']).toBe(true);
  });

  it('should return error when national code is invalid', () => {
    const formControl = new FormControl('', [validators.nationalCode]);
    formControl.setValue('1273642905');
    expect(formControl.errors?.['nationalCode']).toBe(true);
  });

  it('should not return error when national code is valid', () => {
    const formControl = new FormControl('', [validators.nationalCode]);
    formControl.setValue('1273642902');
    expect(formControl.errors?.['nationalCode']).not.toBe(true);
  });
});
