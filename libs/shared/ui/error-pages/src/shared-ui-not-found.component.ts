import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import lottie from 'lottie-web';

import { isHandsetScreen } from '@ledger-portal/shared/util/common';

@Component({
    selector: 'lib-shared-ui-not-found',
    imports: [CommonModule, MatButtonModule, MatCardModule, MatSidenavModule],
    templateUrl: './shared-ui-not-found.component.html',
    styleUrl: './shared-ui-not-found.component.scss'
})
export class SharedUiNotFoundComponent implements OnInit {
  private location = inject(Location);
  private document = inject(DOCUMENT);

  isHandsetScreen$ = isHandsetScreen();
  @ViewChild('lottieContainer') lottieContainer?: ElementRef<HTMLDivElement>;

  ngOnInit() {
    this.document.defaultView?.setTimeout(this.startNotFoundAnimation, 0);
  }

  goBack() {
    this.location.back();
  }

  private startNotFoundAnimation = () => {
    if (!this.lottieContainer) {
      return;
    }

    lottie.loadAnimation({
      container: this.lottieContainer?.nativeElement,
      path: './assets/lotties/404.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
  };
}
