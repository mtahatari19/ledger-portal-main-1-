import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'ledger-portal-toggle-color-scheme',
  templateUrl: './toggle-color-scheme.component.html',
  imports: [MatIconModule, MatSlideToggleModule],
})
export class ToggleColorSchemeComponent {
  @Output() toggleChange = new EventEmitter<MatSlideToggleChange>();
  @Input() checked?: boolean;
  @Input() hideIcons = false;

  valueChange(event: MatSlideToggleChange) {
    this.toggleChange.emit(event);
  }
}
