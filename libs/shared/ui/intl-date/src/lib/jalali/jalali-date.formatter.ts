import moment from 'jalali-moment';

const MOMENT_NAMED_FORMATS: Record<string, string> = {
  short: 'y/M/D، ساعت H:mm',
  medium: 'D MMM y، ساعت H:mm:ss',
  long: 'D MMMM y، ساعت H:mm:ss (Z)',
  full: 'dddd D MMMM y، ساعت H:mm:ss (Z)',
  shortDate: 'y/MM/DD',
  mediumDate: 'D MMM y',
  longDate: 'D MMMM y',
  fullDate: 'dddd D MMMM y',
  shortTime: 'H:mm',
  mediumTime: 'H:mm:ss',
  longTime: 'H:mm:ss (Z)',
  fullTime: 'H:mm:ss (Z)',
};

export function transformDateToJalali(date: Date | string | number, format = 'short') {
  return moment(date)
    .locale('fa')
    .format(MOMENT_NAMED_FORMATS[format] || format);
}
