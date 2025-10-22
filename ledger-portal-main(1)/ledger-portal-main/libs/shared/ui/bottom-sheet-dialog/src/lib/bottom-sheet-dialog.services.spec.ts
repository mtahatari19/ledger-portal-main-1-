import { TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';

import { BottomSheetDialog } from './bottom-sheet-dialog.services';

describe('BottomSheetDialogService', () => {
  let service: BottomSheetDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatBottomSheetModule, MatDialogModule],
      providers: [BottomSheetDialog],
    });
    service = TestBed.inject(BottomSheetDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
