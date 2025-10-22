import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbanVendorComponent } from './iban-vendor.component';
import { VendorComponent } from '@ledger-portal/shared/ui/vendor';
import { IMAGES_PATH } from '@ledger-portal/shared/util/web-sdk';
import { render, RenderResult } from '@testing-library/angular';

describe('IbanVendorComponent', () => {
  let element: RenderResult<IbanVendorComponent>;
  let component: IbanVendorComponent;
  let fixture: ComponentFixture<IbanVendorComponent>;

  beforeEach(async () => {
    element = await render(IbanVendorComponent, {
      imports: [VendorComponent],
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
