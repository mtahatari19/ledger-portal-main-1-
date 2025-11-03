import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { humanizeHours } from './humanize-hours.formatter';

@Pipe({
  name: 'humanizeHours',
  standalone: true,
})
export class HumanizeHoursPipe implements PipeTransform {
  localeId = inject(LOCALE_ID);
  transform(value?: number | string): string | undefined {
    if (!value) return;

    return `${humanizeHours(Number(value), this.localeId)}${this.localeId === 'fa' ? 'ه' : ''}`;
  }
}
