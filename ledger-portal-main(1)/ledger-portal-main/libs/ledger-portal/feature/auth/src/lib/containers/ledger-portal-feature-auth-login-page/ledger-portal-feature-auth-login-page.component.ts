import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PublicHeaderComponent } from '@ledger-portal/shared/ui/header';

import { LedgerPortalLoginComponent } from '../../widgets/ledger-portal-login/ledger-portal-login.component';

@Component({
    selector: 'ledger-portal-login-page',
    imports: [PublicHeaderComponent, MatSidenavModule, LedgerPortalLoginComponent],
    templateUrl: './ledger-portal-feature-auth-login-page.component.html'
})
export class LedgerPortalFeatureAuthLoginPageComponent {}
