import localeData from '@angular/common/locales/fa';
import { ɵLocaleDataIndex } from '@angular/core';

const newLocaleData = <any>localeData;

newLocaleData[ɵLocaleDataIndex.NumberFormats] = ['#,##0.###', '#,##0%', '#,##0.00 ¤‎', '#E0'];
newLocaleData[ɵLocaleDataIndex.Currencies]['IRT'] = ['تومان', 'تومان', 0];

export default newLocaleData;
