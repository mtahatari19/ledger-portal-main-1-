import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { ToWords } from '@ledger-portal/shared/ui/to-words';
import { getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'toWords',
  standalone: true,
})
export class ToWordsPipe implements PipeTransform {
  private toWords: ToWords;

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    this.toWords = new ToWords({
      localeCode: this.localeId,
    });
  }

  transform(value: number | undefined | null): string {
    return this.toWords.convert(value || 0);
  }
}
