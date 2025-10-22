import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUiNotFoundComponent } from './shared-ui-not-found.component';

describe('SharedUiNotFoundComponent', () => {
  let component: SharedUiNotFoundComponent;
  let fixture: ComponentFixture<SharedUiNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
