import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { BankNames, VendorNames } from '@ledger-portal/shared/data/vendor';
import { IMAGES_PATH } from '@ledger-portal/shared/util/web-sdk';

@Component({
  selector: 'ledger-portal-vendor',
  templateUrl: './vendor.component.html',
  standalone: true,
})
export class VendorComponent implements OnInit, OnChanges {
  @Input() vendor!: VendorNames;
  @Input() width = '24px';
  @Input() height = '24px';

  logoPath?: string;

  constructor(@Inject(IMAGES_PATH) private imagesPath: string) {}

  ngOnInit() {
    this.logoPath = this.getLogoPath();
  }

  ngOnChanges() {
    this.logoPath = this.getLogoPath();
  }

  private getLogoPath() {
    const vendorDirectory = Object.values(BankNames).includes(this.vendor) ? 'banks' : null;

    if (!vendorDirectory) {
      return `url(./assets/icons/bank.svg)`;
    }

    if (this.vendor === BankNames.UNKNOWN) {
      return `url(./assets/icons/bank.svg)`;
    }

    return `url(${this.imagesPath}/logos/${vendorDirectory}/${this.vendor.toLowerCase()}.svg)`;
  }
}
