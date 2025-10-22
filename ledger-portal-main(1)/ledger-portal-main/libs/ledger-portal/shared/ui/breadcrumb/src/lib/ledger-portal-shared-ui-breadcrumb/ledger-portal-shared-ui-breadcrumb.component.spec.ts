import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerPortalSharedUiBreadcrumbComponent } from './ledger-portal-shared-ui-breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: LedgerPortalSharedUiBreadcrumbComponent;
  let fixture: ComponentFixture<LedgerPortalSharedUiBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerPortalSharedUiBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LedgerPortalSharedUiBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
