import { inject, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import {
  GoogleAnalyticsActionEnum,
  GoogleAnalyticsCategoriesEnum,
  GoogleAnalyticsEventsEnum,
} from './google-analytics.enum';
import { GoogleAnalyticsEvent } from './google-analytics.model';
import { Environment, ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';

declare const gtag: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(ENVIRONMENT) private environment: Environment) {}

  loadGoogleAnalytics(...trackingIDs: string[]): void {
    if (!this.document?.documentElement?.firstChild || !trackingIDs?.length) return;
    for (const trackingID of trackingIDs) {
      const gaScript = this.document.createElement('script');
      gaScript.setAttribute('async', 'true');
      gaScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${trackingID}`);

      const gaScript2 = this.document.createElement('script');
      gaScript2.innerText = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());
      gtag('config', '${trackingID}');`;

      this.document.documentElement.firstChild.appendChild(gaScript);
      this.document.documentElement.firstChild.appendChild(gaScript2);
    }
  }

  trackEvent(event: GoogleAnalyticsEvent) {
    if (gtag) {
      gtag('event', GoogleAnalyticsEventsEnum[event.identifier], {
        event_category: GoogleAnalyticsCategoriesEnum[event.category],
        event_action: GoogleAnalyticsActionEnum[event.action],
        event_label: GoogleAnalyticsEventsEnum[event.identifier],
        value: event.identifier,
      });
    }
  }

  trackViewPage(url: string) {
    gtag('config', this.environment.gaTrackingId, {
      page_path: url,
    });
  }
}
