import moment from 'jalali-moment';
import { isMoment, localeData, Moment, MomentInput } from 'jalali-moment';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateAdapterOptions } from '@angular/material-moment-adapter';
import { Inject, Optional } from '@angular/core';
import { convertNonEnglishDigitsToEnglish } from '@ledger-portal/shared/util/localize';

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

export class JalaliMomentDateAdapter extends DateAdapter<Moment> {
  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) private dateLocale: string,
    @Optional()
    @Inject(MAT_MOMENT_DATE_ADAPTER_OPTIONS)
    private _options?: MatMomentDateAdapterOptions
  ) {
    super();
    this.setLocale(dateLocale || moment.locale());
  }

  /**
   * returns year in jalali calendar system.
   */
  getYear(date: Moment): number {
    return this.clone(date).jYear();
  }

  /**
   * returns month in jalali calendar system.
   */
  getMonth(date: Moment): number {
    return this.clone(date).jMonth();
  }

  /**
   * returns day in jalali calendar system.
   */
  getDate(date: Moment): number {
    return this.clone(date).jDate();
  }

  /**
   * returns Day Of Week in jalali calendar system.
   */
  getDayOfWeek(date: Moment): number {
    return this.clone(date).day();
  }

  /**
   * returns Month Names in jalali calendar system.
   * most of the time we use long format. short or narrow format for month names is a little odd.
   */
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
      case 'short':
        return localeData('fa').jMonths().slice(0);
      case 'narrow':
        return localeData('fa').jMonthsShort().slice(0);
    }
  }

  /**
   * borrowed from angular material code.
   */
  getDateNames(): string[] {
    return range(31, i => String(i + 1));
    // return this._localeData.dates;
  }

  /**
   * returns Day Of Week names in jalali calendar system.
   */
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return localeData('fa').weekdays().slice(0);
      case 'short':
        return localeData('fa').weekdaysShort().slice(0);
      case 'narrow':
        return ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
    }
  }

  /**
   * returns year in jalali calendar system.
   */
  getYearName(date: Moment): string {
    return this.clone(date).jYear().toString();
  }

  /**
   * returns first day of week in jalali calendar system.
   * first day of week is saturday, شنبه
   */
  getFirstDayOfWeek(): number {
    return localeData('fa').firstDayOfWeek();
  }

  /**
   * returns Number of Days In Month in jalali calendar system.
   */
  getNumDaysInMonth(date: Moment): number {
    return this.clone(date).daysInMonth();
  }

  clone(date: Moment): Moment {
    return date.clone().locale('fa');
  }

  /**
   * Pass 3 number in jalali calendar system to this function, and it returns a jMoment object
   * @param year jalali year
   * @param month zero indexed jalali month
   * @param date jalali day
   */
  createDate(year: number, month: number, date: number): Moment {
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    const result = moment()
      .jYear(year)
      .jMonth(month)
      .jDate(date)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .locale('fa');
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date ${date} for month with index ${month}.`);
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }

  today(): Moment {
    return moment().locale('fa');
  }

  parse(value: MomentInput, parseFormat: string | string[]): Moment | null {
    if (value && typeof value === 'string') {
      const dateString = convertNonEnglishDigitsToEnglish(value);
      const dateStandard = moment(dateString, 'jYYYY/jM/jD');
      const dateReversed = moment(dateString, 'jD/jM/jYYYY');
      const dateValid =
        dateStandard.isValid() || dateReversed.isValid()
          ? dateStandard.year() > 1900
            ? dateStandard
            : dateReversed
          : null;

      if (dateValid) {
        return moment(dateValid, parseFormat).locale('fa');
      }

      return null;
    }
    return value ? moment(value).locale('fa') : null;
  }

  format(date: Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('JalaliMomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  addCalendarYears(date: Moment, years: number): Moment {
    return this.clone(date).add(years, 'jYear');
  }

  addCalendarMonths(date: Moment, months: number): Moment {
    return this.clone(date).add(months, 'jMonth');
  }

  addCalendarDays(date: Moment, days: number): Moment {
    return this.clone(date).add(days, 'jDay');
  }

  /**
   *Gets the RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339) for the given date.
   * This method is used to generate date strings that are compatible with native HTML attributes
   *such as the `min` or `max` attribute of an `<input>`.
   *@param date The date to get the ISO date string for.
   *@returns The ISO date string.
   */
  toIso8601(date: Moment): string {
    return this.clone(date).format();
  }

  isDateInstance(obj: string): boolean {
    return isMoment(obj);
  }

  isValid(date: Moment): boolean {
    return this.clone(date).isValid();
  }

  invalid(): Moment {
    return moment.invalid();
  }

  /**
   * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
   * string into null. Returns an invalid date for all other values.
   */

  /**
   * Attempts to deserialize a value to a valid date object. This is different from parsing in that
   * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
   * string). The default implementation does not allow any deserialization, it simply checks that
   * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
   * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
   * support passing values from your backend directly to these properties by overriding this method
   * to also deserialize the format used by your backend.
   * @param value The value to be deserialized into a date object.
   * @returns The deserialized date object, either a valid date, null if the value can be
   *     deserialized into a null date (e.g. the empty string), or an invalid date.
   */
  override deserialize(value: Date | string): Moment | null {
    let date;
    if (value instanceof Date) {
      date = moment(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = moment(value, moment.ISO_8601).locale('fa');
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }
}
