import { getLocaleDirection } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { IMAGES_PATH } from '@ledger-portal/shared/util/web-sdk';
import { LogoType } from './logo.component.models';
import { logoMapping } from '../constants';

@Component({
  selector: 'ledger-portal-logo',
  templateUrl: './logo.component.html',
  standalone: true,
})
export class LogoComponent implements OnInit {
  logosPath = `${this.imagesPath}/logos/ledger-portal/`;

  @Input() type: LogoType = 'normal';
  @Input() logo?: string;
  @Input() width?: number;
  @Input() height?: number;

  constructor(@Inject(LOCALE_ID) protected localeId: string, @Inject(IMAGES_PATH) protected imagesPath: string) {}

  ngOnInit() {
    this.logo = this.logosPath + logoMapping[`${this.type}-${getLocaleDirection(this.localeId)}`];
  }
}
