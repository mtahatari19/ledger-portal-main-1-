import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import lottie, { AnimationItem } from 'lottie-web';

import { LedgerPortalSharedUiBreadcrumbComponent } from '@ledger-portal/back-office/shared/ui/breadcrumb';
import { SharedUiFullScreenDialogModule } from '@ledger-portal/shared/ui/full-screen-dialog';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

@Component({
  selector: 'ledger-portal-feature-home',
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    SharedUiFullScreenDialogModule,
    MatButton,
    SvgIconTypeDirective,
    LedgerPortalSharedUiBreadcrumbComponent,
  ],
  templateUrl: './ledger-portal-feature-home.component.html',
  styleUrl: './ledger-portal-feature-home.component.scss',
})
export class LedgerPortalFeatureHomeComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private lottieInstance: AnimationItem | undefined;
  private buildingPageLottieAnimationPath = './assets/lotties/building-page.json';

  @ViewChild('lottieContainer') lottieContainer?: ElementRef<HTMLDivElement>;

  handleBackButtonRouting() {
    this.router.navigate(['/navigate']);
  }

  ngAfterViewInit(): void {
    // Initialize Lottie animation after view is ready
    setTimeout(() => {
      this.initBuildingPageLottie();
    }, 100);
  }

  ngOnDestroy(): void {
    // Clean up Lottie animation to prevent memory leaks
    if (this.lottieInstance) {
      this.lottieInstance.destroy();
      this.lottieInstance = undefined;
    }
  }

  private initBuildingPageLottie = (): void => {
    if (!this.lottieContainer) {
      return;
    }

    // Destroy existing animation before creating new one
    if (this.lottieInstance) {
      this.lottieInstance.destroy();
    }

    // Create new Lottie animation
    this.lottieInstance = lottie.loadAnimation({
      container: this.lottieContainer?.nativeElement as Element,
      path: this.buildingPageLottieAnimationPath,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });

    // Add event listeners for better control
    this.lottieInstance.addEventListener('complete', () => {
      console.log('Building page animation completed');
    });

    this.lottieInstance.addEventListener('loopComplete', () => {
      console.log('Building page animation loop completed');
    });
  };

  // Public method to manually trigger animation (useful for testing)
  public triggerAnimation(): void {
    if (this.lottieInstance) {
      this.lottieInstance.play();
    }
  }

  // Public method to pause animation
  public pauseAnimation(): void {
    if (this.lottieInstance) {
      this.lottieInstance.pause();
    }
  }

  // Public method to stop animation
  public stopAnimation(): void {
    if (this.lottieInstance) {
      this.lottieInstance.stop();
    }
  }
}
