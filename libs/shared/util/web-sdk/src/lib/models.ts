import { FirebaseOptions } from '@firebase/app';

export interface Environment<TWidgetId extends string = string> {
  blockSearchIndexing: boolean;
  firebase?: FirebaseOptions & { publicVapidKey?: string };
  trackWebsiteTraffic: boolean;
  production: boolean;
  baseUrl: string;
  apiPath: string;
  apiRoot: string;
  imagesPath: string;
  userIdle: { idle: number; timeout: number };
  keys?: Record<string, string>;
  widgetsLoadStatus?: Partial<Record<TWidgetId, boolean>>;
  posthog: {
    apiHost: string;
    token: string;
  };
  productListUrl?: string;
  compactVersion: boolean;
}

declare global {
  class Android {
    static finishNativePage: () => void;

    static downloadBase64(base64: string, fileName?: string): void;

    static openNativeAppgamBanFromPWA: () => void;
  }
}
declare global {
  class Ios {
    static finishNativePage: () => void;
  }
}
