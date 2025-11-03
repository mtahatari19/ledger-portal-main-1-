import { TRANSLATIONS } from '@ledger-portal/shared/util/web-sdk';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export function provideSharedUtilLocalize(translations: Record<string, string>): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: TRANSLATIONS,
      useValue: translations,
    },
  ]);
}
