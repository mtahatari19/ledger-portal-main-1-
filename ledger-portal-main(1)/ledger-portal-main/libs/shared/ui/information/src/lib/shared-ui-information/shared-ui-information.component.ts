import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

@Component({
    selector: 'ledger-portal-shared-ui-information',
    imports: [MatIconModule, SvgIconTypeDirective],
    templateUrl: './shared-ui-information.component.html'
})
export class SharedUiInformationComponent {}
