import * as moment from 'moment';

export function humanizeHours(hours: number, locale: string = 'fa') {
  moment.locale(locale); // Set the locale based on the provided parameter

  return moment.duration(hours, 'hours').humanize();
}
