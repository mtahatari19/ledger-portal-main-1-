import { getLocaleDirection } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { bmiLogoMapping } from '../constants';
import { LogoComponent } from '../logo/logo.component';
import { BmiLogoOrientation } from './gam-logo.models';

@Component({
  selector: 'ledger-portal-logo',
  templateUrl: './gam-logo.component.html',
  standalone: true,
})
export class GamLogoComponent extends LogoComponent implements OnInit {
  override logosPath = `${this.imagesPath}/logos/ledger-portal/`;
  @Input() orientation: BmiLogoOrientation = 'horizontal';

  override ngOnInit() {
    this.logo =
      this.logosPath + bmiLogoMapping[`${this.type}-${this.orientation}-${getLocaleDirection(this.localeId)}`];
  }
}
