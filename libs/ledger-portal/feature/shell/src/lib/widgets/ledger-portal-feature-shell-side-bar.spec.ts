import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LedgerPortalFeatureShellSideBarComponent } from './ledger-portal-feature-shell-side-bar.component';

describe('SideMenuComponent', () => {
  let component: LedgerPortalFeatureShellSideBarComponent;
  let fixture: ComponentFixture<LedgerPortalFeatureShellSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerPortalFeatureShellSideBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LedgerPortalFeatureShellSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
