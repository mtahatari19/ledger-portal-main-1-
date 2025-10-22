import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerPortalFeatureHomeComponent } from './ledger-portal-feature-home.component';

describe('LedgerPortalFeatureHomeComponent', () => {
  let component: LedgerPortalFeatureHomeComponent;
  let fixture: ComponentFixture<LedgerPortalFeatureHomeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerPortalFeatureHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LedgerPortalFeatureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
