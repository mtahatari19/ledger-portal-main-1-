import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiLogosModule } from '@ledger-portal/shared/ui/logo';
import { ENVIRONMENT, IMAGES_PATH } from '@ledger-portal/shared/util/web-sdk';
import * as fromSettings from '@ledger-portal/shared/data/setting';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LINKS } from './public-header.component.constants';
import { PublicHeaderComponent } from './public-header.component';
import { SharedDataSettingModule } from '@ledger-portal/shared/data/setting';

describe('PublicHeaderComponent', () => {
  let component: PublicHeaderComponent;
  let fixture: ComponentFixture<PublicHeaderComponent>;
  let store: MockStore;

  const initialState: fromSettings.State = {
    language: {
      name: 'انگلیسی',
      code: 'fa',
    },
    theme: {
      colorScheme: 'light',
      colorPalette: {
        title: 'default',
        name: 'default',
        primary: '#eee',
        accent: '#121212',
      },
    },
    error: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHeaderComponent],
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        MatFormFieldModule,
        MatIconTestingModule,
        MatInputModule,
        MatMenuModule,
        MatButtonModule,
        MatListModule,
        MatExpansionModule,
        MatSlideToggleModule,
        SharedUiLogosModule,
        SharedDataSettingModule,
      ],
      providers: [
        provideMockStore({
          initialState,
        }),
        {
          provide: IMAGES_PATH,
          useValue: './assets/images',
        },
        {
          provide: ENVIRONMENT,
          useValue: {},
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an anchor tag for every link in navbar', () => {
    const navbarElement = fixture.nativeElement.querySelector('nav');
    const navbarLinks = navbarElement.querySelectorAll('a');

    expect(navbarLinks.length).toBe(LINKS.length);
  });

  it('should have a target blank for all of the external URLs', () => {
    const navbarElement = fixture.nativeElement.querySelector('nav');
    const navbarExternalLinks = Array.from<HTMLAnchorElement>(navbarElement.querySelectorAll('a')).filter(
      element => element.target.length
    );

    expect(navbarExternalLinks.length).toBe(LINKS.filter(link => link.isExternal).length);
  });

  it('should dispatch a Profile/API Change Language action when changeLanguage is called', () => {
    const languageCode = 'en';
    const action = fromSettings.changeLanguage({ languageCode });

    component.changeLanguage(languageCode);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a Profile/API Change Color Palette action when changeColorPalette is called', () => {
    const colorPaletteName = 'default';
    const action = fromSettings.changeColorPalette({ colorPaletteName });

    component.changeColorPalette(colorPaletteName);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a Profile/API Change colorScheme action when toggleDarkMode is called', () => {
    const colorScheme = 'dark';
    const action = fromSettings.changeColorScheme({ colorScheme });

    component.toggleDarkMode(colorScheme === 'dark');

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
