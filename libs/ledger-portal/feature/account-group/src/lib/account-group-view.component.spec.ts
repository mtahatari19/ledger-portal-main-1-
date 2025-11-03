import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountGroupViewComponent } from './account-group-view.component';

describe('AccountGroupViewComponent', () => {
  let component: AccountGroupViewComponent;
  let fixture: ComponentFixture<AccountGroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountGroupViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

