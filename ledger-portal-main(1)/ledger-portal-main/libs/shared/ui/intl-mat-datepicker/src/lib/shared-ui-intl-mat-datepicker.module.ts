import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { JalaliMomentDateAdapter } from './moment-date-adapter';

@NgModule({
  imports: [CommonModule, MatDatepickerModule, MatMomentDateModule],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useFactory: dateAdapterFactory, deps: [MAT_DATE_LOCALE] },
  ],
  exports: [MatDatepickerModule],
})
export class SharedUiIntlMatDatepickerModule {}

export function dateAdapterFactory(locale: string) {
  return locale.startsWith('fa') ? new JalaliMomentDateAdapter(locale) : new MomentDateAdapter(locale);
}
