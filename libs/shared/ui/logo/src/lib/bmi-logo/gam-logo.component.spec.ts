import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMAGES_PATH } from '@ledger-portal/shared/util/web-sdk';

import { BmiLogoComponent } from './gam-logo.component';

function getLogoName(fixture: ComponentFixture<BmiLogoComponent>) {
  const logoElement: HTMLElement = fixture.nativeElement;
  const logoSrc = logoElement.querySelector('img')?.src;
  const logoName = logoSrc?.split('/')[logoSrc?.split('/').length - 1];

  return logoName;
}

describe('BmiLogoComponent', () => {
  let component: BmiLogoComponent;
  let fixture: ComponentFixture<BmiLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmiLogoComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: IMAGES_PATH, useValue: './assets/images' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmiLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the horizontal logo by default', () => {
    const logoName = getLogoName(fixture);
    expect(logoName).toMatch('bmi-hor.svg');
  });

  it('should show the horizontal logo when orientation is horizontal', () => {
    component.orientation = 'horizontal';
    component.ngOnInit();
    fixture.detectChanges();

    const logoName = getLogoName(fixture);
    expect(logoName).toMatch('bmi-hor.svg');
  });

  it('should show the vertical logo when orientation is vertical', () => {
    component.orientation = 'vertical';
    component.ngOnInit();
    fixture.detectChanges();

    const logoName = getLogoName(fixture);
    expect(logoName).toMatch('bmi-vert.svg');
  });

  it("should show the default logo if locale doesn't have specific logo", () => {
    component.orientation = 'horizontal';
    component.ngOnInit();
    fixture.detectChanges();

    const logoName = getLogoName(fixture);
    expect(logoName).toMatch('bmi-hor.svg');
  });
});
