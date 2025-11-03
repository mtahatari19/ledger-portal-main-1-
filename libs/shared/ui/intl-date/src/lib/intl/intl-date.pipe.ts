import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { transformDateToJalali } from '../jalali/jalali-date.formatter';

@Pipe({
  name: 'intlDate',
  standalone: true,
})
export class IntlDatePipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private localeId: string) {
    super(localeId);
  }

  override transform(value: any, format?: string): any {
    if (this.localeId?.startsWith('fa')) {
      return transformDateToJalali(value, format);
    }
    return super.transform(value, format);
  }
}
