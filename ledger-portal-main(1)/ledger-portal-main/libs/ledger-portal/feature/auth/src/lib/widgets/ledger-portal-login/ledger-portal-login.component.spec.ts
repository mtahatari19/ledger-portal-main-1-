import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LedgerPortalLoginComponent } from './ledger-portal-login.component';

describe('LedgerPortalLoginComponent', () => {
  let component: LedgerPortalLoginComponent;
  let fixture: ComponentFixture<LedgerPortalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerPortalLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LedgerPortalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
