import { SETTING_FEATURE_KEY, State } from './setting.reducer';
import * as SettingSelectors from './setting.selectors';

describe('Setting Selectors', () => {
  let state: { [SETTING_FEATURE_KEY]: State };

  beforeEach(() => {
    state = {
      [SETTING_FEATURE_KEY]: {
        error: null,
        theme: {
          colorPalette: {
            name: 'default',
            title: 'Default Title',
            primary: '#fff',
            accent: '#eee',
          },
          colorScheme: 'light',
        },
        language: {
          code: 'fa',
          name: 'farsi',
        },
      },
    };
  });

  describe('Setting Selectors', () => {
    it('getSettingLanguage() should return the language', () => {
      const result = SettingSelectors.getSettingLanguage(state);

      expect(result).toBe(state[SETTING_FEATURE_KEY].language);
    });

    it('getSettingError() should return the error property', () => {
      const result = SettingSelectors.getSettingError(state);

      expect(result).toBe(state[SETTING_FEATURE_KEY].error);
    });

    it('getSettingThemeColorPalette() should return the colorPalette', () => {
      const result = SettingSelectors.getSettingThemeColorPalette(state);

      expect(result).toBe(state[SETTING_FEATURE_KEY].theme.colorPalette);
    });

    it('getSettingThemeColorScheme() should return the colorScheme', () => {
      const result = SettingSelectors.getSettingThemeColorScheme(state);

      expect(result).toBe(state[SETTING_FEATURE_KEY].theme.colorScheme);
    });
  });
});
