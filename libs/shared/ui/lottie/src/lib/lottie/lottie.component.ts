import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import lottie, { AnimationConfig } from 'lottie-web';
import { DOCUMENT } from '@angular/common';

export type LottiStatus = 'warn' | 'error' | 'success' | 'info';

const lottieStatuses: Record<LottiStatus, string> = {
  success: 'tick-circle',
  warn: 'warning-circle',
  error: 'close-circle',
  info: 'info-circle',
};

@Component({
    selector: 'ledger-portal-lottie',
    imports: [],
    templateUrl: './lottie.component.html'
})
export class LottieComponent implements OnInit {
  private document = inject(DOCUMENT);

  @ViewChild('lottieContainer') lottieContainer?: ElementRef<HTMLDivElement>;
  @Input({ required: true }) status!: LottiStatus;
  @Input() options!: Omit<AnimationConfig, 'container' | 'path' | 'renderer'>;

  ngOnInit() {
    this.document.defaultView?.setTimeout(this.startTickCircleLottieAnimation, 0);
  }

  private startTickCircleLottieAnimation = () => {
    if (!this.lottieContainer) {
      return;
    }

    lottie.loadAnimation({
      container: this.lottieContainer?.nativeElement,
      path: `./assets/lotties/${lottieStatuses[this.status]}.json`,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      ...this.options,
    });
  };
}
