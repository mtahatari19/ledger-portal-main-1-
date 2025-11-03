import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { isHandsetScreen } from '@ledger-portal/shared/util/common';

@Component({
    selector: 'ledger-portal-full-screen-dialog',
    templateUrl: './full-screen-dialog.component.html',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatTooltipModule,
        MatIconModule,
        SvgIconTypeDirective,
        NgTemplateOutlet,
        MatDividerModule,
        AsyncPipe,
    ]
})
export class FullScreenDialogComponent {
  @Input({ transform: booleanAttribute }) borderless = false;
  @Input() showCloseButton = true;
  isHandset$ = isHandsetScreen();
}
