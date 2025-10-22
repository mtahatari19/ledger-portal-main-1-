import { ColorPalette, FontSizeEntity } from './setting.models';

export enum StorageKey {
  PREFERRED_LANGUAGE = 'preferred-language',
  PREFERRED_COLOR_PALETTE = 'preferred-color-palette',
  PREFERRED_COLOR_SCHEME = 'preferred-color-scheme',
  PREFERRED_FONT_SIZE = 'preferred-font-size',
}

export const COLOR_PALETTES: readonly ColorPalette[] = [
  {
    name: 'theme--default',
    title: $localize`پیش‌فرض`,
    primary: '#2c92f2',
    accent: '#f89b17',
    default: true,
  },
  {
    name: 'theme--spring',
    title: $localize`بهاری`,
    primary: '#ea366c',
    accent: '#3392d6',
  },
  {
    name: 'theme--autumn',
    title: $localize`پاییزی`,
    primary: '#f85f31',
    accent: '#53899c',
  },
];

export const LANGUAGES = [
  {
    code: 'fa',
    name: 'فارسی',
  },
  // {
  //   code: 'fa-AZ',
  //   name: 'ترکی',
  // },
  // {
  //   code: 'ar',
  //   name: 'العربیة',
  // },
  {
    code: 'en',
    name: 'English',
  },
] as const;

export const fontSizes: FontSizeEntity[] = [
  { title: $localize`:عنوان اندازه متن کوچک:کوچک`, size: 16 },
  {
    title: $localize`:عنوان اندازه متن متوسط:متوسط`,
    size: 18,
  },
  { title: $localize`:عنوان اندازه متن بزرگ:بزرگ`, size: 20 },
];

export const themeTitles: Record<string, string> = {
  light: $localize`:عنوان تم برنامه در حالت روشن:روشنایی`,
  dark: $localize`:عنوان تم برنامه در حالت شب:حالت شب`,
};
