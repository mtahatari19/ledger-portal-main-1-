import { ReplaceNonEnglishDigitsDirective } from './replace-non-english-digits.directive';
import { AbstractControl, NgControl } from '@angular/forms';

describe('ReplaceNonEnglishDigitsDirective', () => {
  it('should create an instance', () => {
    const ngControl = <NgControl>{
      get control(): AbstractControl | null {
        return null;
      },
    };
    const directive = new ReplaceNonEnglishDigitsDirective(ngControl);
    expect(directive).toBeTruthy();
  });
});
