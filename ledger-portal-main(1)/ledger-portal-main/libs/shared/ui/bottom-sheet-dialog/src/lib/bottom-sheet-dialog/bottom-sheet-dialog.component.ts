import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT, AsyncPipe } from '@angular/common';
import { Component, HostListener, Inject, Optional } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { map } from 'rxjs';

@Component({
  selector: 'ledger-portal-bottom-sheet-dialog',
  templateUrl: './bottom-sheet-dialog.component.html',
  imports: [AsyncPipe],
})
export class BottomSheetDialogComponent {
  private readonly DISTANCE_CLOSE_THRESHOLD = -120;
  private readonly SLIDE_UP_SLOWNESS_RATE = 3;
  private readonly bottomSheetContainerInstanceElement?: HTMLElement;
  isHandsetScreen$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches));
  initialHeight = 0;
  startY = 0;
  currentY = 0;
  highestY = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private breakpointObserver: BreakpointObserver,
    @Optional() private bottomSheetRef: MatBottomSheetRef
  ) {
    if (this.bottomSheetRef) {
      this.bottomSheetContainerInstanceElement = //eslint-disable-next-line  @typescript-eslint/no-explicit-any
        (this.bottomSheetRef.containerInstance as any)._elementRef.nativeElement;
    }
  }

  scrollToBottomOfContent = () => {
    setTimeout(() => {
      if (this.bottomSheetContainerInstanceElement) {
        this.bottomSheetContainerInstanceElement.scrollTop = this.bottomSheetContainerInstanceElement.scrollHeight;
      }
    }, 300);
  };

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (!this.bottomSheetContainerInstanceElement) {
      return;
    }

    this.startY = event.changedTouches[0].clientY;
    if (!this.initialHeight) {
      this.initialHeight = this.bottomSheetContainerInstanceElement.offsetHeight;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.bottomSheetContainerInstanceElement) {
      return;
    }

    const insideContent = this.bottomSheetContainerInstanceElement.getElementsByTagName(
      'gam-bottom-sheet-dialog-content'
    )[0] as HTMLElement;
    const contentScrollHeight = insideContent.scrollHeight - insideContent.clientHeight;

    const dialogScrollHeight =
      this.bottomSheetContainerInstanceElement.scrollHeight - this.bottomSheetContainerInstanceElement.clientHeight;

    this.currentY = event.touches[0].clientY;

    if (contentScrollHeight !== 0) {
      if (insideContent.scrollTop > 0 && insideContent.scrollTop <= contentScrollHeight) {
        this.startY = this.currentY;
        return;
      }

      if (insideContent.scrollTop === 0 && this.startY < this.currentY) {
        if (event.cancelable) event.preventDefault();
      }
    } else if (dialogScrollHeight !== 0) {
      if (
        this.bottomSheetContainerInstanceElement.scrollTop > 0 &&
        this.bottomSheetContainerInstanceElement.scrollTop <= dialogScrollHeight
      ) {
        this.startY = this.currentY;
        return;
      }

      if (this.bottomSheetContainerInstanceElement.scrollTop === 0 && this.startY < this.currentY) {
        if (event.cancelable) event.preventDefault();
      }
    } else {
      event.preventDefault();
    }

    if (this.currentY > this.highestY) {
      this.highestY = this.currentY;
    }

    const height = Math.abs(this.startY - this.currentY);
    if (this.startY > this.currentY) {
      this.bottomSheetContainerInstanceElement.style.height = `${
        this.initialHeight + height / this.SLIDE_UP_SLOWNESS_RATE
      }px`;
    } else {
      this.bottomSheetContainerInstanceElement.style.height = `${this.initialHeight - height}px`;
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (!this.bottomSheetContainerInstanceElement) {
      return;
    }

    const endY = event.changedTouches[0].clientY;
    const distance = this.startY - endY;

    if (distance < this.DISTANCE_CLOSE_THRESHOLD && endY >= this.highestY) {
      this.bottomSheetRef.dismiss();
    } else {
      this.highestY = 0;

      this.bottomSheetContainerInstanceElement.classList.add('slow-height-transition');
      this.bottomSheetContainerInstanceElement.style.height = `${this.initialHeight}px`;

      this.document.defaultView?.setTimeout(() => {
        this.bottomSheetContainerInstanceElement?.classList.remove('slow-height-transition');
      }, 300);
    }
  }
}
