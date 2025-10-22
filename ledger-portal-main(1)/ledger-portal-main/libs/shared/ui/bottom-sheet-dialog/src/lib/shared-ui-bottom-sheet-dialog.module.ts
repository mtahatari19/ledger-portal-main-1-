import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetDialogComponent } from './bottom-sheet-dialog/bottom-sheet-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BottomSheetDialog } from './bottom-sheet-dialog.services';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetDialogContentComponent } from './bottom-sheet-dialog-content/bottom-sheet-dialog-content.component';
import { BottomSheetDialogActionsComponent } from './bottom-sheet-dialog-actions/bottom-sheet-dialog-actions.component';
import { BottomSheetDialogCloseDirective, BottomSheetDialogTitleDirective } from './bottom-sheet-dialog.directives';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatBottomSheetModule,
    BottomSheetDialogComponent,
    BottomSheetDialogTitleDirective,
    BottomSheetDialogContentComponent,
    BottomSheetDialogActionsComponent,
    BottomSheetDialogCloseDirective,
  ],
  exports: [
    BottomSheetDialogComponent,
    BottomSheetDialogTitleDirective,
    BottomSheetDialogContentComponent,
    BottomSheetDialogActionsComponent,
    BottomSheetDialogCloseDirective,
  ],
  providers: [BottomSheetDialog],
})
export class SharedUiBottomSheetDialogModule {}
