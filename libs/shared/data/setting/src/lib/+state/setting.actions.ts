import { createAction, props } from '@ngrx/store';
import { FontSizeEntity, Language, Theme } from './setting.models';

export const init = createAction('[Setting Page] Init');

export const loadSettingSuccess = createAction(
  '[Setting/API] Load Setting Success',
  props<{
    languageCode: Language['code'] | null;
    colorPaletteName: Theme['colorPalette']['name'] | null;
    colorScheme: Theme['colorScheme'] | null;
  }>()
);

export const loadSettingFailure = createAction('[Setting/API] Load Setting Failure', props<{ error: any }>());

export const changeLanguage = createAction(
  '[Setting/API] Change Language',
  props<{ languageCode: Language['code'] }>()
);

export const changeLanguageSuccess = createAction('[Setting/API] Change Language Success');

export const changeLanguageFailure = createAction('[Setting/API] Change Language Failure', props<{ error: any }>());

export const changeColorPalette = createAction(
  '[Setting/API] Change Color Palette',
  props<{ colorPaletteName: Theme['colorPalette']['name'] }>()
);

export const changeColorPaletteSuccess = createAction('[Setting/API] Change Color Palette Success');

export const changeColorPaletteFailure = createAction(
  '[Setting/API] Change Color Palette Failure',
  props<{ error: any }>()
);

export const changeColorScheme = createAction(
  '[Setting/API] Change Color Scheme',
  props<{ colorScheme: Theme['colorScheme'] }>()
);

export const changeColorSchemeSuccess = createAction(
  '[Setting/API] Change Color Scheme Success',
  props<{ colorScheme: Theme['colorScheme'] }>()
);

export const changeColorSchemeFailure = createAction(
  '[Setting/API] Change Color Scheme Failure',
  props<{ error: any }>()
);
export const changeFontSize = createAction(
  '[Setting/API] Change Font Size',
  props<{
    size: FontSizeEntity['size'];
  }>()
);

export const changeFontSchemeSuccess = createAction('[Setting/API] Change Font Size Success');

export const changeFontSchemeFailure = createAction('[Setting/API] Change Font Size Failure', props<{ error: any }>());
