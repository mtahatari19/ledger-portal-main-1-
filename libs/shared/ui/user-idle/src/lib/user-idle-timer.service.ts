import { inject, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserIdleService } from 'angular-user-idle';
import { Environment, ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';
import { UserIdleTimerComponent } from './user-idle-timer.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { UserIdleData, UserIdleWatchConfig } from './user-idle-timer.model';

@Injectable({
  providedIn: 'root',
})
export class UserIdleTimerService {
  isWatching = false;
  timeIsTicking = false;
  userIdleData: UserIdleData = {
    idle: this.environment.userIdle.idle,
    timeout: this.environment.userIdle.timeout,
    timerCount: 0,
  };

  private timerSnackBarRef?: MatSnackBarRef<UserIdleTimerComponent>;
  private timerStartSubscription!: Subscription;
  private timeoutSubscription!: Subscription;

  private environment = inject(ENVIRONMENT);
  private userIdle = inject(UserIdleService);
  private snackBar = inject(MatSnackBar);

  startWatching(config: Partial<UserIdleWatchConfig>) {
    this.isWatching = true;
    this.userIdle.setConfigValues({
      idle: this.userIdleData.idle,
      timeout: this.userIdleData.timeout,
    });

    this.userIdle.startWatching();

    this.timerStartSubscription = this.userIdle.onTimerStart().subscribe(count => {
      this.userIdleData.timerCount = this.userIdleData.timeout - count;
      if (!this.timeIsTicking) {
        this.timeIsTicking = true;
        this.timerSnackBarRef = this.snackBar.openFromComponent(UserIdleTimerComponent, { data: this.userIdleData });
        this.timerSnackBarRef.onAction().subscribe(() => {
          this.resetTimer();
          if (config.onContinue) {
            config.onContinue();
          }
        });
      }
    });

    this.timeoutSubscription = this.userIdle.onTimeout().subscribe(() => {
      this.timerSnackBarRef?.dismiss();
      this.stopWatching();
      if (config.onTimeout) {
        config.onTimeout();
      }
    });
  }

  private stopWatching() {
    this.userIdle.stopWatching();
    this.timerStartSubscription.unsubscribe();
    this.timeoutSubscription.unsubscribe();
    this.isWatching = false;
    this.timeIsTicking = false;
  }

  private resetTimer() {
    this.userIdle.resetTimer();
    this.timeIsTicking = false;
  }
}
