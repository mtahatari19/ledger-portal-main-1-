import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nx/angular';
import { readFirst } from '@nx/angular/testing';

import { ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';
import { LocalStorageService } from '@ledger-portal/shared/util/local-storage';
import { SettingEffects } from './setting.effects';
import { SettingFacade } from './setting.facade';
import { SETTING_FEATURE_KEY, reducer, State } from './setting.reducer';
import { SettingUtils } from './setting.utils';
import { StorageKey } from '@ledger-portal/shared/data/setting';

interface TestSchema {
  profile: State;
}

describe('SettingFacade', () => {
  let facade: SettingFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(SETTING_FEATURE_KEY, reducer), EffectsModule.forFeature([SettingEffects])],
        providers: [SettingFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}

      TestBed.configureTestingModule({
        imports: [RootModule],
        providers: [
          {
            provide: ENVIRONMENT,
            useValue: {},
          },
          SettingUtils,
          {
            provide: LocalStorageService,
            useValue: {
              getItem: jest.fn((key: string) => {
                if (key === StorageKey.PREFERRED_COLOR_SCHEME) {
                  return 'dark';
                }
                if (key === StorageKey.PREFERRED_COLOR_PALETTE) {
                  return 'default';
                }
                if (key === StorageKey.PREFERRED_LANGUAGE) {
                  return 'en';
                }

                return null;
              }),
              setItem: () => null,
            },
          },
        ],
      });

      store = TestBed.inject(Store);
      facade = TestBed.inject(SettingFacade);
    });

    it('init() should set received values from localStorage', async () => {
      let language = await readFirst(facade.language$);
      let theme = await readFirst(facade.theme$);

      expect(language.code).toBe('fa');
      expect(theme.colorScheme).toBe('light');

      facade.init();

      language = await readFirst(facade.language$);
      theme = await readFirst(facade.theme$);

      expect(language.code).toBe('en');
      expect(theme.colorScheme).toBe('dark');
    });
  });
});
