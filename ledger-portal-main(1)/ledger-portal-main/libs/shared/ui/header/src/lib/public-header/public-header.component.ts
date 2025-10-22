import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLinkActive, RouterLink } from '@angular/router';

import { map } from 'rxjs';

import {
  COLOR_PALETTES,
  ColorPalette,
  Language,
  LANGUAGES,
  SettingFacade,
  themeTitles,
} from '@ledger-portal/shared/data/setting';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { LogoComponent } from '@ledger-portal/shared/ui/logo';
import { ToggleColorSchemeComponent } from '@ledger-portal/shared/ui/theme';

import { LINKS } from './public-header.component.constants';

@Component({
  selector: 'ledger-portal-public-header',
  templateUrl: './public-header.component.html',
  imports: [
    MatToolbarModule,
    LogoComponent,
    MatButtonModule,
    RouterLinkActive,
    RouterLink,
    ToggleColorSchemeComponent,
    MatMenuModule,
    MatIconModule,
    SvgIconTypeDirective,
    AsyncPipe,
    MatListModule,
    MatButtonToggleModule,
    MatExpansionModule,
  ],
})
export class PublicHeaderComponent {
  private settingFacade = inject(SettingFacade);
  private breakpointObserver = inject(BreakpointObserver);

  links = LINKS;
  language$ = this.settingFacade.language$;
  languages = LANGUAGES;
  colorScheme$ = this.settingFacade.colorScheme$;
  isSmallScreen$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(map(state => state.matches));
  colorPalettes = COLOR_PALETTES;
  colorPalette$ = this.settingFacade.colorPalette$;
  themeTitles = themeTitles;

  changeLanguage(code: Language['code']) {
    this.settingFacade.changeLanguage(code);
  }

  changeColorPalette(colorPaletteName: ColorPalette['name']) {
    this.settingFacade.changeColorPalette(colorPaletteName);
  }
  calculatePaletteCircleStyle(primary: string, accent: string) {
    return `linear-gradient(90deg, ${accent} 50%, ${primary} 50%)`;
  }

  toggleDarkMode(isDark: boolean) {
    this.settingFacade.changeColorScheme(isDark ? 'dark' : 'light');
  }
}
