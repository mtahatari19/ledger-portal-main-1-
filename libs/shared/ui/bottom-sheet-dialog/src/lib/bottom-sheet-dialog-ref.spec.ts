import { TestBed } from '@angular/core/testing';

import { BottomSheetDialogRef } from './bottom-sheet-dialog-ref';

describe('BottomSheetDialogRefService', () => {
  let service: BottomSheetDialogRef;

  beforeEach(() => {
    service = TestBed.inject(BottomSheetDialogRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
