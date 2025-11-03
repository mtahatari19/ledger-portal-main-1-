import { ApplicationConfig } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { SettingEffects } from './+state/setting.effects';
import { SettingFacade } from './+state/setting.facade';
import { SettingUtils } from './+state/setting.utils';
import * as fromSetting from './+state/setting.reducer';

export function provideSharedDataSetting(): ApplicationConfig['providers'] {
  return [
    provideState(fromSetting.SETTING_FEATURE_KEY, fromSetting.reducer),
    provideEffects(SettingEffects),
    SettingFacade,
    SettingUtils,
  ];
}
