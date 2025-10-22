import { transformDateToJalali } from '../jalali/jalali-date.formatter';
import { formatDate } from '@angular/common';

export function formatIntlDate(value: string | number | Date, format: string, locale: string, timezone?: string) {
  if (locale.startsWith('fa')) {
    return transformDateToJalali(value, format);
  }

  return formatDate(value, format, locale, timezone);
}
