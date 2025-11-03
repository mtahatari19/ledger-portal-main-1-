import { Component, DestroyRef, inject, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { LogoComponent } from '@ledger-portal/shared/ui/logo';
import { MenuGroup, OtherMenuGroup, menuGroups } from '@ledger-portal/back-office/data/menu';


@Component({
  selector: 'ledger-portal-back-feature-shell-side-bar',
  imports: [LogoComponent, MatExpansionModule, MatIconModule, MatListModule, SvgIconTypeDirective, RouterLink, RouterLinkActive],
  templateUrl: './ledger-portal-feature-shell-side-bar.component.html',
  styleUrls: ['./ledger-portal-feature-shell-side-bar.component.scss'],
})
export class LedgerPortalFeatureShellSideBarComponent {
  @Input() isExpanded = true;
  @Input() adminName = '';
  @Input() adminLastName = '';
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  menu: MenuGroup[] = menuGroups;
  redirectToHome() {
    this.router.navigate(['/console']);
  }
}
