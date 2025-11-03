import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

@Component({
  selector: 'ledger-portal-error-state',
  imports: [MatIconModule, SvgIconTypeDirective, MatCardModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss',
})
export class ErrorStateComponent {
  caption = input<string | null>();
  alt = input('');
  showImage = input(true);

  @Output() retry = new EventEmitter<void>();

  emitRetry() {
    this.retry.emit();
  }
}
