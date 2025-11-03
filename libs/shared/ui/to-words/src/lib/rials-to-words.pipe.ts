import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { ToWords } from '@ledger-portal/shared/ui/to-words';
import { getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'rialsToWords',
  standalone: true,
})
export class RialsToWordsPipe implements PipeTransform {
  private toWords: ToWords;

  constructor(@Inject(LOCALE_ID) public localeId: string) {
    this.toWords = new ToWords({
      localeCode: this.localeId,
      converterOptions: {
        ignoreDecimal: true,
        ignoreZeroCurrency: false,
      },
    });
  }

  transform(value: number | undefined | null, currency = 'IRT'): string {
    const symbol = getCurrencySymbol(currency, 'wide', this.localeId);
    const words = this.toWords.convert(value && currency === 'IRT' ? value / 10 : value || 0);
    return words + ' ' + symbol;
  }
}
