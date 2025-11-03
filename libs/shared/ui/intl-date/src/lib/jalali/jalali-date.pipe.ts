import { Pipe, PipeTransform } from '@angular/core';
import { transformDateToJalali } from './jalali-date.formatter';

@Pipe({
  name: 'jalaliDate',
  standalone: true,
})
export class JalaliDatePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined, format?: string): string | null {
    return value ? transformDateToJalali(value, format) : null;
  }
}
