import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SETTING_FEATURE_KEY, State } from './setting.reducer';

export const getSettingState = createFeatureSelector<State>(SETTING_FEATURE_KEY);

export const getSettingError = createSelector(getSettingState, (state: State) => state.error);

export const getSettingLanguage = createSelector(getSettingState, (state: State) => state.language);

export const getSettingTheme = createSelector(getSettingState, (state: State) => state.theme);

export const getSettingThemeColorPalette = createSelector(getSettingState, (state: State) => state.theme.colorPalette);

export const getSettingThemeColorScheme = createSelector(getSettingState, (state: State) => state.theme.colorScheme);
export const getSettingFontScheme = createSelector(getSettingState, (state: State) => state.fontSize);
