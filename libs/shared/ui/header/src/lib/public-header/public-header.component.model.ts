import { NavigationExtras } from '@angular/router';

export interface HeaderLink extends NavigationExtras {
  title: string;
  command: string;
  isExternal: boolean;
}
