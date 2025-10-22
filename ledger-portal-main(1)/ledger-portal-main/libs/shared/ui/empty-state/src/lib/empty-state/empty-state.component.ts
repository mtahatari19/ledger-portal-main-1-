import { NgTemplateOutlet } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SvgIconType, SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { isHandsetScreen } from '@ledger-portal/shared/util/common';

@Component({
  selector: 'ledger-portal-empty-state',
  imports: [MatIconModule, SvgIconTypeDirective, MatCardModule, NgTemplateOutlet],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  isHandsetScreen$ = isHandsetScreen();
  @HostBinding('class') cls = 'h-full !bg-inherit';

  @Input({ required: true }) caption!: string;
  @Input() ledgerPortalSvgIconType!: SvgIconType;
  @Input() svgIcon!: string;
  @Input() imageSrc!: string;
  @Input() showImage = false;
}
