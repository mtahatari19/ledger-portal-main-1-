import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LedgerPortalMasterComponent } from './ledger-portal-master.component';

describe('LedgerPortalMasterComponent', () => {
  let component: LedgerPortalMasterComponent;
  let fixture: ComponentFixture<LedgerPortalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerPortalMasterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LedgerPortalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
