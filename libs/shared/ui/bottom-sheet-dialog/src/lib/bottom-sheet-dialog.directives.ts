import { Directive, ElementRef, HostBinding, HostListener, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[ledger-portal-bottom-sheet-dialog-close], [ledgerPortalBottomSheetDialogClose]',
  standalone: true,
})
export class BottomSheetDialogCloseDirective {
  constructor(
    @Optional() public bottomSheetRef: MatBottomSheetRef<unknown>,
    @Optional() public dialogRef: MatDialogRef<unknown>
  ) {}

  @HostListener('click')
  _onButtonClick() {
    this.bottomSheetRef?.dismiss();
    this.dialogRef?.close();
  }
}

@Directive({
  selector: '[ledger-portal-bottom-sheet-dialog-title], [ledgerPortalBottomSheetDialogTitle]',
  standalone: true,
})
export class BottomSheetDialogTitleDirective extends MatDialogTitle {
  @HostBinding('class') cls = 'bottom-sheet-dialog-title';

  constructor(
    _elementRef: ElementRef<HTMLElement>,
    _dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    @Optional() private bottomSheetRef: MatBottomSheetRef<unknown>,
    @Optional() private dialogRef: MatDialogRef<unknown>
  ) {
    super(dialogRef, _elementRef, _dialog);
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      _elementRef.nativeElement.classList.remove('mat-mdc-dialog-title', 'mdc-dialog__title');
    }
  }

  @HostListener('click')
  _onButtonClick() {
    this.bottomSheetRef?.dismiss();
    this.dialogRef?.close();
  }
}
