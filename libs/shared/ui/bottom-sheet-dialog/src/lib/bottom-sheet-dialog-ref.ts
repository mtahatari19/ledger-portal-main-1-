import { Injectable, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Injectable({ providedIn: 'root' })
export class BottomSheetDialogRef<T = unknown, R = unknown> {
  get componentInstance(): T | null {
    return this._dialogRef ? this._dialogRef.componentInstance : this._bottomSheetRef?.instance ?? null;
  }

  constructor(
    @Optional() private _bottomSheetRef?: MatBottomSheetRef<T, R>,
    @Optional() private _dialogRef?: MatDialogRef<T, R>
  ) {}

  dismiss(result?: R) {
    if (this._dialogRef) {
      this._dialogRef.close(result);
    } else {
      this._bottomSheetRef?.dismiss(result);
    }
  }

  afterOpened() {
    const ref = this._dialogRef || this._bottomSheetRef;

    if (!ref) {
      throw new Error('No Bottom Sheet Dialog is open!');
    }

    return ref.afterOpened();
  }

  afterDismissed() {
    if (!this._dialogRef && !this._bottomSheetRef) {
      throw new Error('No Bottom Sheet Dialog is open!');
    }

    if (this._dialogRef) {
      return this._dialogRef.afterClosed();
    }

    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    return this._bottomSheetRef!.afterDismissed();
  }

  backDropClick() {
    const ref = this._dialogRef || this._bottomSheetRef;

    if (!ref) {
      throw new Error('No Bottom Sheet Dialog is open!');
    }

    return ref.backdropClick();
  }

  keydownEvents() {
    const ref = this._dialogRef || this._bottomSheetRef;

    if (!ref) {
      throw new Error('No Bottom Sheet Dialog is open!');
    }

    return ref.keydownEvents();
  }
}
