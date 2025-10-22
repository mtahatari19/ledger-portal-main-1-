import { TestBed } from '@angular/core/testing';

import { UserIdleTimerService } from './user-idle-timer.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserIdleService } from 'angular-user-idle';
import { ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';

describe('UserIdleTimerService', () => {
  let service: UserIdleTimerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        MatSnackBar,
        UserIdleService,
        {
          provide: ENVIRONMENT,
          useValue: {
            userIdle: {
              idle: 5,
              timeout: 10,
            },
          },
        },
      ],
    });
    service = TestBed.inject(UserIdleTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
