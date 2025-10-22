// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { menuItems } from '@ledger-portal/back-office/data/menu';
import { Environment } from '@ledger-portal/shared/util/web-sdk';

export const environment: Environment<(typeof menuItems)[number]['id']> = {

  blockSearchIndexing: true,
  trackWebsiteTraffic: false,
  production: false,
  baseUrl: 'http://146.59.83.245:8075', // Base URL for HTTP requests
  apiPath: '/rest/gl-core', // API path for GL Core endpoints
  apiRoot: '/api',
  imagesPath: './assets/images',
  userIdle: {
    idle: 60 * 60,
    timeout: 60 * 2,
  },
  posthog: {
    token: '',
    apiHost: '',
  },
  compactVersion: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
