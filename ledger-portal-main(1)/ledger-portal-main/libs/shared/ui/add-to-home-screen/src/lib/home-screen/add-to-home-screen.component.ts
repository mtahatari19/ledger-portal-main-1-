import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LocalStorageService } from '@ledger-portal/shared/util/local-storage';
import { MatButtonModule } from '@angular/material/button';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '@ledger-portal/shared/ui/logo';

@Component({
    selector: 'ledger-portal-add-to-home-screen',
    templateUrl: './add-to-home-screen.component.html',
    imports: [LogoComponent, MatIconModule, SvgIconTypeDirective, MatButtonModule]
})
export class AddToHomeScreenComponent {
  private readonly LS_KEY = 'is-installed';

  close() {
    this._bottomSheet.dismiss();
    this.localStorage.setItem(this.LS_KEY, 'true');
  }

  constructor(private _bottomSheet: MatBottomSheet, private localStorage: LocalStorageService) {}
}
