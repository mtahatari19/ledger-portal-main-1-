/* eslint-disable @angular-eslint/no-input-rename */
import { Component, DoCheck, ElementRef, Inject, Input, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { DecimalPipe } from '@angular/common';
import { ReplaceNonEnglishDigitsDirective } from '../../../../../util/localize/src/lib/replace-non-english-digits/replace-non-english-digits.directive';

@Component({
    selector: 'ledger-portal-amount-input',
    templateUrl: './amount-input.component.html',
    styleUrls: ['./amount-input.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: AmountInputComponent }, DecimalPipe],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[id]': 'id',
    },
    imports: [FormsModule, ReactiveFormsModule, ReplaceNonEnglishDigitsDirective]
})
export class AmountInputComponent
  implements ControlValueAccessor, MatFormFieldControl<number | null>, OnDestroy, DoCheck
{
  // eslint-disable-next-line @typescript-eslint/member-ordering
  static nextId = 0;
  @ViewChild('decimal') decimalInput!: HTMLInputElement;

  parts = new FormGroup({ decimal: new FormControl<string | null>(null) });
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  errorState = false;
  controlType = 'amount-input';
  id = `amount-input-${AmountInputComponent.nextId++}`;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: any) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  get empty() {
    const { decimal } = this.parts.value;
    return !decimal;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input('aria-describedby') userAriaDescribedBy!: string;
  @Input() readOnly = false;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _placeholder!: string;

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _disabled = false;

  @Input()
  get value(): number | null {
    if (this.parts.valid) {
      const { decimal } = this.parts.value;
      return decimal ? Number(decimal?.replace(/\D/g, '')) : null;
    }
    return null;
  }

  set value(amount: number | null) {
    this.parts.setValue({
      decimal: typeof amount === 'number' ? amount.toString() : null,
    });
    this.stateChanges.next();
  }

  constructor(
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField | null,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() private _parentFormGroup: FormGroupDirective,
    private _formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    private decimalPipe: DecimalPipe
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts.controls.decimal.valueChanges.subscribe(value => {
      const formattedValue = value ? this.decimalPipe.transform(value.replace(/\D/g, '').replace(/^0+/g, '')) : value;
      this.parts.controls.decimal.setValue(formattedValue, { emitEvent: false });
      this._handleInput();
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }

  onFocusIn() {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  setDescribedByIds(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const controlElement = this._elementRef.nativeElement.querySelector('.amount-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.decimal.valid) {
      this._focusMonitor.focusVia(this.decimalInput, 'program');
    }
  }

  writeValue(amount: number | null): void {
    this.value = amount;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

  updateErrorState() {
    const oldState = this.errorState;
    const newState =
      (this.ngControl?.invalid || this.parts.invalid) && (this.touched || this._parentFormGroup.submitted);

    if (oldState !== newState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }
}
