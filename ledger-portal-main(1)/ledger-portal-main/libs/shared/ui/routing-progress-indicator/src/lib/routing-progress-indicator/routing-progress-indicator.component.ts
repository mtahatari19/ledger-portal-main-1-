import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'ledger-portal-routing-progress-indicator',
    templateUrl: './routing-progress-indicator.component.html',
    styleUrls: ['./routing-progress-indicator.component.scss'],
    imports: [MatProgressBarModule]
})
export class RoutingProgressIndicatorComponent {
  loading = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
      }
    });
  }
}
