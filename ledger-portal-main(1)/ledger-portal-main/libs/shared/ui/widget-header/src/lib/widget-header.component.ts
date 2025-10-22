import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { isHandsetScreen } from '@ledger-portal/shared/util/common';

@Component({
  selector: 'ledger-portal-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss'],
  imports: [MatCardModule, MatDividerModule, MatToolbarModule, NgClass, AsyncPipe, NgTemplateOutlet],
})
export class WidgetHeaderComponent {
  isHandsetScreen$ = isHandsetScreen();

  borderless = input(false, {
    transform: booleanAttribute,
  });
}
