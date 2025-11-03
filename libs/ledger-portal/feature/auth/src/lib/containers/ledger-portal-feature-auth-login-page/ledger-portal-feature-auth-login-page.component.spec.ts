import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LedgerPortalFeatureAuthLoginPageComponent } from './ledger-portal-feature-auth-login-page.component';

describe('LedgerPortalFeatureAuthLoginPageComponent', () => {
  let component: LedgerPortalFeatureAuthLoginPageComponent;
  let fixture: ComponentFixture<LedgerPortalFeatureAuthLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerPortalFeatureAuthLoginPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LedgerPortalFeatureAuthLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
