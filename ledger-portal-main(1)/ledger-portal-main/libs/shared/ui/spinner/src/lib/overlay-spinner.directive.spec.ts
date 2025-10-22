import { OverlaySpinnerDirective } from './overlay-spinner.directive';
import { ElementRef } from '@angular/core';

describe('OverlaySpinnerDirective', () => {
  const nativeEl: HTMLElement = document.createElement('div');
  const elementRef: ElementRef = new ElementRef<HTMLElement>(nativeEl);

  it('should create an instance', () => {
    const directive = new OverlaySpinnerDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
