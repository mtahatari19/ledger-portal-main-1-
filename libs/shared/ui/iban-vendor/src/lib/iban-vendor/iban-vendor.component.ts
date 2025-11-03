import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { VendorComponent } from '@ledger-portal/shared/ui/vendor';
import { BankNames, VendorNames } from '@ledger-portal/shared/data/vendor';
import { IMAGES_PATH } from '@ledger-portal/shared/util/web-sdk';

@Component({
  selector: 'ledger-portal-iban-vendor',
  templateUrl: './iban-vendor.component.html',
  standalone: true,
  imports: [VendorComponent],
})
export class IbanVendorComponent implements OnChanges, OnInit {
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

    return `url(${this.imagesPath}/logos/${vendorDirectory}/${this.vendor.toLowerCase()}.svg)`;
  }
}
