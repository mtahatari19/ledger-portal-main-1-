import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { BottomSheetDialogContentComponent } from './bottom-sheet-dialog-content.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BottomSheetDialogContentComponent', () => {
  let element: RenderResult<BottomSheetDialogContentComponent>;
  let component: BottomSheetDialogContentComponent;
  let fixture: ComponentFixture<BottomSheetDialogContentComponent>;

  beforeEach(async () => {
    element = await render(BottomSheetDialogContentComponent, {
      imports: [MatDialogModule],
    });

    fixture = element.fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
