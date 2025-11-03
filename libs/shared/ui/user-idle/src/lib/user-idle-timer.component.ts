import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserIdleData } from './user-idle-timer.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'ledger-portal-user-idle-timer',
    templateUrl: './user-idle-timer.component.html',
    imports: [MatSnackBarModule, MatButtonModule]
})
export class UserIdleTimerComponent {
  snackBarRef = inject(MatSnackBarRef);
  data: UserIdleData = inject(MAT_SNACK_BAR_DATA);
}
