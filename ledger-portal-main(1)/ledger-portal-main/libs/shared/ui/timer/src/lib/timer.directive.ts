import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { map, Subscription, takeWhile, tap, timer } from 'rxjs';

const MAX_OTP_TIMEOUT = 120;
const TICK = 1000;

@Directive({
  selector: '[ledgerPortalTimer]',
  standalone: true,
})
export class TimerDirective implements AfterViewInit, OnDestroy {
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @Input() durationInSeconds = MAX_OTP_TIMEOUT; // Default duration is 120 seconds
  @Output() timerElapsed: EventEmitter<void> = new EventEmitter<void>();

  private initialInnerText = '';
  public remainingSeconds!: number;
  timerSubscription!: Subscription;

  get displayTime() {
    return this.remainingSeconds ? this.formatDuration(this.remainingSeconds) : this.initialInnerText;
  }

  @HostBinding('disabled') disabled = false;
  @HostBinding('class.disabled-style')
  get disabledStyle() {
    return this.disabled;
  }
  ngAfterViewInit() {
    this.initialInnerText = this.elementRef.nativeElement.innerText;
  }

  startTimer() {
    this.remainingSeconds = this.durationInSeconds;
    this.disabled = true;
    this.timerSubscription = timer(0, TICK)
      .pipe(
        takeWhile(() => this.remainingSeconds > 0),
        tap(() => this.remainingSeconds--),
        map(() => this.displayTime)
      )
      .subscribe(
        displayTime => {
          this.elementRef.nativeElement.innerText = displayTime;
        },
        null,
        () => {
          this.disabled = false;
          this.clearTimer();
          this.timerElapsed.emit();
        }
      );
  }

  clearTimer() {
    this.elementRef.nativeElement.innerText = this.initialInnerText;
    this.remainingSeconds = 0;
    this.timerSubscription?.unsubscribe();
  }

  restartTimer() {
    this.clearTimer();
    this.startTimer();
  }

  private formatDuration(durationInSeconds: number) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
