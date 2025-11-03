import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TRANSLATIONS } from '@ledger-portal/shared/util/web-sdk';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  constructor(@Inject(TRANSLATIONS) private translations: Record<string, string>) {}

  transform(key: string): string {
    return this.translations?.[key] ?? key;
  }
}
