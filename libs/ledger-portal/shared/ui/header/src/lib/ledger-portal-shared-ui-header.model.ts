import { NavigationExtras } from '@angular/router';

export interface LedgerPortalHeaderLink extends NavigationExtras {
  id: number;
  title: string;
  command: string;
  isExternal: boolean;
}
