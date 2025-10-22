import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { LogoComponent } from './logo.component';
import { IMAGES_PATH } from '@ledger-portal/shared/util/web-sdk';

function getLogoName(fixture: ComponentFixture<LogoComponent>) {
  const logoElement: HTMLElement = fixture.nativeElement;
  const logoSrc = logoElement.querySelector('img')?.src;
  const logoName = logoSrc?.split('/')[logoSrc?.split('/').length - 1];

  return logoName;
}

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: IMAGES_PATH, useValue: './assets/images' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the logo with name by default', () => {
    const logoName = getLogoName(fixture);
    expect(logoName).toMatch('gam-ltr.svg');
  });

  it('should show the logo with name when type is normal', () => {
    component.type = 'normal';
    component.ngOnInit();
    fixture.detectChanges();

    const logoName = getLogoName(fixture);
    expect(logoName).toMatch(/^gam-ltr.svg/);
  });

  it('should show the logo without name when type is mini', () => {
    component.type = 'mini';
    component.ngOnInit();
    fixture.detectChanges();

    const logoName = getLogoName(fixture);

    expect(logoName).toMatch('gam-mini.svg');
  });
});
