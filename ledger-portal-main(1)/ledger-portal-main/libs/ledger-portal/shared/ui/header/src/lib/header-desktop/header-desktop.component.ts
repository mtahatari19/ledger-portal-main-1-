import { animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { COLOR_PALETTES, ColorPalette, Language, LANGUAGES, SettingFacade } from '@ledger-portal/shared/data/setting';
import { BottomSheetDialog, SharedUiBottomSheetDialogModule } from '@ledger-portal/shared/ui/bottom-sheet-dialog';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { ToggleColorSchemeComponent } from '@ledger-portal/shared/ui/theme';

import { LINKS } from '../ledger-portal-shared-ui-header-constant';

@Component({
  selector: 'ledger-portal-header-desktop',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SvgIconTypeDirective,
    MatMenuModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    ToggleColorSchemeComponent,
    MatCardModule,
    SharedUiBottomSheetDialogModule,
    NgTemplateOutlet,
    AsyncPipe,
  ],
  templateUrl: './header-desktop.component.html',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 0.4,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s')]),
    ]),
    trigger('openCloseCard', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'rotateX(0)',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'rotateX(-90deg)',
        })
      ),
      transition('open => closed', [animate('0.6s cubic-bezier(.45, 1.76, .58, 1)')]),
      transition('closed => open', [animate('0.6s cubic-bezier(.45, 1.76, .58, 1)')]),
    ]),
  ],
})
export class HeaderDesktopComponent {
  private settingFacade = inject(SettingFacade);
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);
  private routes = inject(ActivatedRoute);
  private bottomSheetDialog = inject(BottomSheetDialog);

  links = LINKS;
  languages = LANGUAGES;
  colorPalettes = COLOR_PALETTES;

  language$ = this.settingFacade.language$;
  colorPalette$ = this.settingFacade.colorPalette$;
  colorScheme$ = this.settingFacade.colorScheme$;
  headerSearchModal = false;
  headerSearchModalAnimation = false;
  path = '';
  breadCrumbPath = '';

  @ViewChild('backOfficeHeaderLogoutBottomSheetDialog') headerLogoutBottomSheetDialogTemplate!: TemplateRef<unknown>;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  changeLanguage(code: Language['code']) {
    this.settingFacade.changeLanguage(code);
  }

  changeColorPalette(colorPaletteName: ColorPalette['name']) {
    this.settingFacade.changeColorPalette(colorPaletteName);
  }

  toggleDarkMode(isDark: boolean) {
    this.settingFacade.changeColorScheme(isDark ? 'dark' : 'light');
  }

  calculatePaletteCircleStyle(primary: string, accent: string) {
    return `linear-gradient(90deg, ${accent} 50%, ${primary} 50%)`;
  }

  getSanitizedProfilePhoto(photoContent?: string) {
    return photoContent
      ? this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + photoContent)
      : './assets/images/profile-circle.svg';
  }

  toggleDesktopSearch() {
    if (!this.headerSearchModal) {
      this.headerSearchModal = true;
      setTimeout(() => (this.headerSearchModalAnimation = true), 100);
    } else {
      this.headerSearchModalAnimation = false;
      setTimeout(() => (this.headerSearchModal = false), 300);
    }
  }

  logout() {
    this.router.navigate(['/auth']);
  }

  openHeaderLogoutBottomSheetDialog() {
    this.bottomSheetDialog.open(this.headerLogoutBottomSheetDialogTemplate, {
      minWidth: 400,
      autoFocus: 'dialog',
    });
  }
}
