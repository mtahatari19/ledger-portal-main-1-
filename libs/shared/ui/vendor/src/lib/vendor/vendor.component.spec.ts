import { ComponentFixture } from '@angular/core/testing';

import { VendorComponent } from './vendor.component';
import { IMAGES_PATH } from '@ledger-portal/shared/util/web-sdk';
import { render, RenderResult } from '@testing-library/angular';
import { BankNames } from '@ledger-portal/shared/data/vendor';

describe('VendorComponent', () => {
  let element: RenderResult<VendorComponent>;
  let component: VendorComponent;
  let fixture: ComponentFixture<VendorComponent>;

  beforeEach(async () => {
    element = await render(VendorComponent, {
      componentInputs: {
        vendor: BankNames.MELLI,
      },
      providers: [
        {
          provide: IMAGES_PATH,
          useValue: '',
        },
      ],
    });

    fixture = element.fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
