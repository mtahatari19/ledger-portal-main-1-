import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'ledger-portal-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    imports: [MatProgressSpinnerModule]
})
export class LoadingSpinnerComponent {}
