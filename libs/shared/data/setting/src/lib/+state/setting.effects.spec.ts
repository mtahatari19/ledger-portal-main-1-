import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nx/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';
import { LocalStorageService } from '@ledger-portal/shared/util/local-storage';
import * as SettingActions from './setting.actions';
import { SettingEffects } from './setting.effects';
import { SettingUtils } from './setting.utils';

describe('SettingEffects', () => {
  let actions: Observable<Action>;
  let effects: SettingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SettingEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: ENVIRONMENT,
          useValue: {},
        },
        LocalStorageService,
        SettingUtils,
      ],
    });

    effects = TestBed.inject(SettingEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SettingActions.init() });

      expect(effects.init$).toBeTruthy();
    });
  });
});
