import { Inject, Injectable, Optional, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BottomSheetDialogRef } from './bottom-sheet-dialog-ref';

@Injectable()
export class BottomSheetDialog {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {}

  open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    dialogConfig?: MatDialogConfig<D>,
    bottomSheetConfig?: MatBottomSheetConfig<D>
  ) {
    return this.breakpointObserver.isMatched(Breakpoints.Handset)
      ? new BottomSheetDialogRef(this.bottomSheet.open<T, D, R>(componentOrTemplateRef as any, bottomSheetConfig))
      : new BottomSheetDialogRef(undefined, this.dialog.open<T, D, R>(componentOrTemplateRef, dialogConfig));
  }
}

@Injectable()
export class BottomSheetDialogData<T = unknown> {
  get value() {
    return this.bottomSheetData || this.dialogData;
  }

  constructor(
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) private bottomSheetData: T,
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: T
  ) {}
}
