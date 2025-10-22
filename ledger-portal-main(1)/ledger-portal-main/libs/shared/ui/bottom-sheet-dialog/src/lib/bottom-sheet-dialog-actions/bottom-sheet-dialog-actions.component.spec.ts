import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetDialogActionsComponent } from './bottom-sheet-dialog-actions.component';

describe('BottomSheetDialogActionsComponent', () => {
  let component: BottomSheetDialogActionsComponent;
  let fixture: ComponentFixture<BottomSheetDialogActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomSheetDialogActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomSheetDialogActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
