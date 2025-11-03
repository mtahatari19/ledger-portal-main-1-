import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderDesktopComponent } from '@ledger-portal/back-office/shared/ui/header';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

import { LedgerPortalFeatureShellSideBarComponent } from '../../widgets/ledger-portal-feature-shell-side-bar.component';

@Component({
  selector: 'ledger-portal-master',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    HeaderDesktopComponent,
    MatExpansionModule,
    SvgIconTypeDirective,
    LedgerPortalFeatureShellSideBarComponent,
    RouterOutlet,
  ],
  templateUrl: './ledger-portal-master.component.html',
})
export class LedgerPortalMasterComponent implements OnInit {
  private router = inject(Router);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  fromDateFiltered!: string | null;
  toDateFiltered!: string | null;
  adminName = '';
  adminLastName = '';
  isExpanded = true;

  ngOnInit() {
    console.log('test');
  }
}
