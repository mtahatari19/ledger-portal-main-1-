import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  importProvidersFrom,
  inject,
  isDevMode,
  LOCALE_ID,
  Provider,
  provideEnvironmentInitializer,
} from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material/progress-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { ledgerPortalSharedUiIconRegister } from '@ledger-portal/back-office/shared/ui/icon';
import { provideSharedDataSetting } from '@ledger-portal/shared/data/setting';
import { provideSharedUiAlert } from '@ledger-portal/shared/ui/alert';
import { SharedUiBottomSheetDialogModule } from '@ledger-portal/shared/ui/bottom-sheet-dialog';
import { provideSharedUtilAppCore } from '@ledger-portal/shared/util/app-core';
import { overrideLocaleData } from '@ledger-portal/shared/util/locales';
import { provideSharedUtilLocalize } from '@ledger-portal/shared/util/localize';

import { environment } from '../environments/environment';
import { backOfficeRoutes } from './app.routes';

function initializeEnvironment() {
  const localeId = inject(LOCALE_ID);

  ledgerPortalSharedUiIconRegister();
  overrideLocaleData(localeId);
}
const MAT_DEFAULT_OPTIONS_OVERRIDES: Provider[] = [
  {
    provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
    useValue: {
      diameter: 25,
    },
  },
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: {
      appearance: 'outline',
      hideRequiredMarker: true,
    },
  },
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {
      duration: 5_000,
      verticalPosition: 'top',
    },
  },
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(backOfficeRoutes, withEnabledBlockingInitialNavigation()),
    provideSharedDataSetting(),
    provideAnimations(),
    importProvidersFrom(SharedUiBottomSheetDialogModule),
    provideSharedUiAlert(),
    provideStore(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    provideHttpClient(),
    provideEffects([]),
    provideStoreDevtools({
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    provideSharedUtilAppCore(environment),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'IRR' },
    { provide: LOCALE_ID, useValue: 'fa' },
    provideEnvironmentInitializer(initializeEnvironment),
    ...MAT_DEFAULT_OPTIONS_OVERRIDES,
  ],
};
