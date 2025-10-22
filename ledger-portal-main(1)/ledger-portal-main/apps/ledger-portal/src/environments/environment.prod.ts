import { menuItems } from '@ledger-portal/back-office/data/menu';
import { Environment } from '@ledger-portal/shared/util/web-sdk';

export const environment: Environment<(typeof menuItems)[number]['id']> = {

  blockSearchIndexing: false,
  trackWebsiteTraffic: true,
  production: true,
  baseUrl: 'https://api.tata.com', // Base URL for HTTP requests
  apiPath: '/rest/gl-core', // API path for GL Core endpoints
  apiRoot: '/api',
  imagesPath: './assets/images',
  userIdle: {
    idle: 60 * 5,
    timeout: 60 * 2,
  },
  widgetsLoadStatus: {},
  posthog: {
    token: '',
    apiHost: '',
  },
  compactVersion: false,
};
