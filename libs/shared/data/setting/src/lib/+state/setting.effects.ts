import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nx/angular';

import { LocalStorageService } from '@ledger-portal/shared/util/local-storage';
import * as SettingActions from './setting.actions';
import { SettingUtils } from './setting.utils';
import { StorageKey } from './setting.constants';
import { ColorScheme } from './setting.models';
import { tap } from 'rxjs';

@Injectable()
export class SettingEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingActions.init),
      fetch({
        run: () => {
          const languageCode = this.localStorage.getItem(StorageKey.PREFERRED_LANGUAGE);
          const colorPaletteName = this.localStorage.getItem(StorageKey.PREFERRED_COLOR_PALETTE);
          const colorScheme = this.localStorage.getItem(StorageKey.PREFERRED_COLOR_SCHEME) as ColorScheme | null;
          const fontSize = Number(this.localStorage.getItem(StorageKey.PREFERRED_FONT_SIZE));

          this.settingUtils.changeLanguage(languageCode);
          this.settingUtils.changeColorPalette(colorPaletteName);
          this.settingUtils.changeColorScheme(colorScheme);
          this.settingUtils.changeFontSize(fontSize);

          return SettingActions.loadSettingSuccess({ languageCode, colorPaletteName, colorScheme });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SettingActions.loadSettingFailure({ error });
        },
      })
    )
  );

  changeLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingActions.changeLanguage),
      pessimisticUpdate({
        run: action => {
          this.settingUtils.changeLanguage(action.languageCode);

          return SettingActions.changeLanguageSuccess();
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SettingActions.changeLanguageFailure({ error });
        },
      })
    )
  );

  changeColorPalette$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingActions.changeColorPalette),
      pessimisticUpdate({
        run: ({ colorPaletteName }) => {
          this.settingUtils.changeColorPalette(colorPaletteName);

          return SettingActions.changeColorPaletteSuccess();
        },
        onError: (_action, error) => {
          console.error('Error', error);
          return SettingActions.changeColorPaletteFailure({ error });
        },
      })
    )
  );

  changeColorScheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingActions.changeColorScheme),
      pessimisticUpdate({
        run: ({ colorScheme }) => {
          this.settingUtils.changeColorScheme(colorScheme);

          return SettingActions.changeColorSchemeSuccess({ colorScheme });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SettingActions.changeColorSchemeFailure({ error });
        },
      })
    )
  );

  changeFontSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingActions.changeFontSize),
      pessimisticUpdate({
        run: ({ size }) => {
          this.settingUtils.changeFontSize(size);

          return SettingActions.changeFontSchemeSuccess();
        },
        onError: (_action, error) => {
          console.error('Error', error);
          return SettingActions.changeFontSchemeFailure({ error });
        },
      })
    )
  );

  loadSettingSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SettingActions.loadSettingSuccess),
        tap(setting => (setting.colorScheme ? this.settingUtils.updateThemeColorMetaTag(setting.colorScheme) : null))
      ),
    { dispatch: false }
  );

  changeColorSchemeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SettingActions.changeColorSchemeSuccess),
        tap(({ colorScheme }) => this.settingUtils.updateThemeColorMetaTag(colorScheme))
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private settingUtils: SettingUtils,
    private localStorage: LocalStorageService
  ) {}
}
