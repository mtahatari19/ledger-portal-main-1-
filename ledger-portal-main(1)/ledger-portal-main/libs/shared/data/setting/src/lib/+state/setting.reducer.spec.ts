import { Action } from '@ngrx/store';

import * as SettingActions from './setting.actions';
import { State, initialState, reducer } from './setting.reducer';

describe('Setting Reducer', () => {
  describe('valid Setting actions', () => {
    it('changeLanguage action should update the language', () => {
      const action = SettingActions.changeLanguage({ languageCode: 'fa' });

      const result: State = reducer(initialState, action);

      expect(result.language.code).toBe('fa');
    });

    it('changeColorPalette action should update the palette', () => {
      const action = SettingActions.changeColorPalette({ colorPaletteName: 'girl' });

      const result: State = reducer(initialState, action);

      expect(result.theme.colorPalette.name).toBe('girl');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
