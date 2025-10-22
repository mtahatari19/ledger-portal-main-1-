import { TestBed } from '@angular/core/testing';
import { FullScreenDialog } from '@ledger-portal/shared/ui/full-screen-dialog';
import { MatDialogModule } from '@angular/material/dialog';

describe('FullScreenDialogService', () => {
  let service: FullScreenDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [FullScreenDialog],
    });
    service = TestBed.inject(FullScreenDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
