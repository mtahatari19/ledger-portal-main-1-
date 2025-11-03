import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiInformationComponent } from './shared-ui-information.component';

describe('SharedUiInformationComponent', () => {
  let component: SharedUiInformationComponent;
  let fixture: ComponentFixture<SharedUiInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
