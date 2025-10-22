import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';
import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';

export function provideSharedUiAlert(): EnvironmentProviders {
  return makeEnvironmentProviders([AlertService, importProvidersFrom(MatSnackBarModule)]);
}
