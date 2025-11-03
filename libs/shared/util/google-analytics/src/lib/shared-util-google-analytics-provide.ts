import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';

export function provideSharedUtilGoogleAnalytics(...trackingIds: string[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: (analyticsService: GoogleAnalyticsService) => () => {
        analyticsService.loadGoogleAnalytics(...trackingIds);
      },
      deps: [GoogleAnalyticsService],
      multi: true,
    },
    GoogleAnalyticsService,
  ]);
}
