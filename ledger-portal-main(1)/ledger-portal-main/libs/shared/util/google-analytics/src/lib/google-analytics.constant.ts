import { GoogleAnalyticsEvent } from './google-analytics.model';
import {
  GoogleAnalyticsActionEnum,
  GoogleAnalyticsCategoriesEnum,
  GoogleAnalyticsEventsEnum,
} from './google-analytics.enum';

export const gaLoginEvent: GoogleAnalyticsEvent = {
  identifier: GoogleAnalyticsEventsEnum.login,
  category: GoogleAnalyticsCategoriesEnum.UI_Interaction,
  action: GoogleAnalyticsActionEnum.click,
};
