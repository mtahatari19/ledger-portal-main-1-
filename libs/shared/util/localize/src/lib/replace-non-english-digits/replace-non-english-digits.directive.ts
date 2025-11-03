import { Directive, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { convertNonEnglishDigitsToEnglish } from '../helpers';

@Directive({
  selector: '[ledgerPortalReplaceNonEnglishDigits]',
  standalone: true,
})
export class ReplaceNonEnglishDigitsDirective {
  constructor(@Optional() @Self() public ngControl: NgControl) {}

  @HostListener('beforeinput', ['$event'])
  public onBeforeInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const selectionStart = target.selectionStart ?? 0;
    const selectionEnd = target.selectionEnd ?? 0;
    const currentValue = target.value;
    const inputData = event.data;
    const mappedData = convertNonEnglishDigitsToEnglish(inputData);
    if (mappedData && mappedData !== inputData) {
      event.preventDefault();
      target.value = currentValue.slice(0, selectionStart) + mappedData + currentValue.slice(selectionEnd);
      target.selectionStart = target.selectionEnd = selectionStart + mappedData.length;
      this.ngControl?.control?.setValue(target.value);
    }
  };
}
