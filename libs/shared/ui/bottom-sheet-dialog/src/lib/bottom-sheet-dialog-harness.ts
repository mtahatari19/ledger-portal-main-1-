import { MatDialogHarness, MatDialogSection } from '@angular/material/dialog/testing';

export const enum BottomSheetDialogSections {
  TITLE = '.bottom-sheet-dialog-title',
  CONTENT = '.bottom-sheet-dialog-content',
  ACTIONS = '.bottom-sheet-dialog-actions',
}

export class BottomSheetDialogHarness extends MatDialogHarness {
  static override hostSelector = 'ledger-portal-bottom-sheet-dialog';

  override _title = this.locatorForOptional(MatDialogSection.TITLE);
  override _content = this.locatorForOptional(MatDialogSection.CONTENT);
  override _actions = this.locatorForOptional(MatDialogSection.ACTIONS);
}
