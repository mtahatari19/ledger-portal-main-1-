import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ledgerPortalFocusFirstInvalidControl]',
  standalone: true,
})
export class FormFocusFirstInvalidControlDirective {
  focusableElements = ['input', 'textarea', 'select', 'button', 'details'];

  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit() {
    const invalidFormFocusableControls = this.el.nativeElement.querySelectorAll(
      `${this.focusableElements
        .map(element => `${element}[class*="ng-invalid"]:not([disabled]):not([tabindex="-1"])`)
        .join(',')}, [tabindex]:not([tabindex="-1"])`
    );

    if (invalidFormFocusableControls.length) {
      invalidFormFocusableControls[0].focus();
    }
  }
}
