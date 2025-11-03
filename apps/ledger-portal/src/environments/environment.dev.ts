import { menuItems } from '@ledger-portal/back-office/data/menu';
import { Environment } from '@ledger-portal/shared/util/web-sdk';

export const environment: Environment<(typeof menuItems)[number]['id']> = {
  blockSearchIndexing: true,
  trackWebsiteTraffic: true,
  production: true,
  baseUrl: 'http://156.255.1.52:80',
  apiPath: '/rest/gl-core',
  apiRoot: '/api',
  imagesPath: './assets/images',
  userIdle: {
    idle: 60 * 30,
    timeout: 60 * 2,
  },
  posthog: {
    token: '',
    apiHost: '',
  },
  compactVersion: false,
};
