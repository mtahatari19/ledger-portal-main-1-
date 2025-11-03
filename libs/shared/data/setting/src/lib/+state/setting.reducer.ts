import { Action, createReducer, on } from '@ngrx/store';

import { DataStatus } from '@ledger-portal/shared/util/store';
import * as SettingActions from './setting.actions';
import { ColorPalette, ColorScheme, FontSizeEntity, SettingEntity } from './setting.models';
import { COLOR_PALETTES, fontSizes, LANGUAGES, StorageKey } from './setting.constants';
import { findColorPaletteByName, findFontSizeBySize, findLanguageByCode } from './setting.utils';

export const SETTING_FEATURE_KEY = 'setting';

const initialLanguage = findLanguageByCode(localStorage.getItem(StorageKey.PREFERRED_LANGUAGE)) ?? LANGUAGES[0];

const initialColorPalette: ColorPalette =
  findColorPaletteByName(localStorage.getItem(StorageKey.PREFERRED_COLOR_PALETTE)) ?? COLOR_PALETTES[0];

const initialColorScheme: ColorScheme =
  (localStorage.getItem(StorageKey.PREFERRED_COLOR_SCHEME) as ColorScheme | null) ?? 'light';

const initialFontSize: FontSizeEntity =
  findFontSizeBySize(Number(localStorage.getItem(StorageKey.PREFERRED_FONT_SIZE))) ?? fontSizes[0];

export interface State extends SettingEntity, Pick<DataStatus, 'error'> {}

export const initialState: State = {
  error: null,
  language: initialLanguage,
  theme: {
    colorPalette: initialColorPalette,
    colorScheme: initialColorScheme,
  },
  fontSize: initialFontSize,
};

const settingReducer = createReducer(
  initialState,
  on(SettingActions.init, state => ({ ...state, error: null })),
  on(SettingActions.loadSettingSuccess, (state, { languageCode, colorPaletteName, colorScheme }) => ({
    ...state,
    error: null,
    language: findLanguageByCode(languageCode) ?? LANGUAGES[0],
    theme: {
      colorScheme: colorScheme ?? 'light',
      colorPalette: findColorPaletteByName(colorPaletteName) ?? COLOR_PALETTES[0],
    },
  })),
  on(SettingActions.loadSettingFailure, (state, { error }) => ({ ...state, error })),
  on(SettingActions.changeLanguage, (state, { languageCode }) => ({
    ...state,
    language: findLanguageByCode(languageCode) ?? LANGUAGES[0],
  })),
  on(SettingActions.changeColorPalette, (state, { colorPaletteName }) => ({
    ...state,
    theme: {
      ...state.theme,
      colorPalette: findColorPaletteByName(colorPaletteName) ?? COLOR_PALETTES[0],
    },
  })),
  on(SettingActions.changeColorScheme, (state, { colorScheme }) => ({
    ...state,
    theme: {
      ...state.theme,
      colorScheme: colorScheme ?? 'light',
    },
  })),

  on(SettingActions.changeFontSize, (state, { size }) => {
    return {
      ...state,
      fontSize: fontSizes.find(fontSize => fontSize.size === size) ?? initialFontSize,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return settingReducer(state, action);
}
