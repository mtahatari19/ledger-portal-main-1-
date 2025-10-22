export interface PromotionContent {
  header: {
    subject: string;
    localizedSubject: string;
    description: string;
    localizedDescription: string;
    iconUrl: string;
  };
  body: {
    subject: string;
    localizedSubject: string;
    description: string;
    localizedDescription: string;
    iconUrl: string;
  }[];
  hyperLink: {
    subject: string | null;
    localizedSubject: string | null;
    description: string;
    localizedDescription: string;
    iconUrl: string | null;
    hyperLinkUrl: string | null;
    androidDeepLink: string | null;
    iosdeepLink: string | null;
  };
  actionButtons?: ActionButtons[];
}

export interface ActionButtons {
  subject: string;
  localizedSubject: string;
  description: string;
  localizedDescription: null;
  iconUrl: null;
  action: string;
  androidAction: string;
  iosaction: null;
}
