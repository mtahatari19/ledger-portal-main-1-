import { SvgIconTypeDirective } from './svg-icon-type.directive';
import { ElementRef } from '@angular/core';

describe('SvgIconTypeDirective', () => {
  it('should create an instance', () => {
    const htmlEl = document.createElement('mat-icon');
    const elementRef = new ElementRef(htmlEl);
    const directive = new SvgIconTypeDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
