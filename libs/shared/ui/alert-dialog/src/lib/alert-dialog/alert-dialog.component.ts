import { Component, EventEmitter, Output } from '@angular/core';
import {
  BottomSheetDialogData,
  BottomSheetDialogRef,
  SharedUiBottomSheetDialogModule,
} from '@ledger-portal/shared/ui/bottom-sheet-dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'ledger-portal-alert-dialog',
    templateUrl: './alert-dialog.component.html',
    providers: [BottomSheetDialogRef, BottomSheetDialogData],
    imports: [SharedUiBottomSheetDialogModule, MatButtonModule]
})
export class AlertDialogComponent {
  @Output() alertDialogAction = new EventEmitter<string>();
  dialogType: string;

  constructor(
    private bottomSheetDialogRef: BottomSheetDialogRef,
    public bottomSheetDialogData: BottomSheetDialogData<{
      icon: string;
      title: string;
      description: string;
      buttonTitle: string;
      dialogType: string;
    }>
  ) {
    this.dialogType = bottomSheetDialogData.value.dialogType;
  }

  alertDialogOnAction() {
    this.alertDialogAction.emit(this.dialogType);
    this.bottomSheetDialogRef.dismiss();
  }
}
