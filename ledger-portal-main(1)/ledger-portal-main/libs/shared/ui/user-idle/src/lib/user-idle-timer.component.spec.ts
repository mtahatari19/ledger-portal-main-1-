import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdleTimerComponent } from './user-idle-timer.component';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { UserIdleData } from './user-idle-timer.model';

describe('UserIdleTimerComponent', () => {
  let component: UserIdleTimerComponent;
  let fixture: ComponentFixture<UserIdleTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserIdleTimerComponent],
      imports: [MatSnackBarModule],
      providers: [
        MatSnackBar,
        {
          provide: MatSnackBarRef,
          useValue: null,
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: <UserIdleData>{
            timerCount: 10,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserIdleTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
