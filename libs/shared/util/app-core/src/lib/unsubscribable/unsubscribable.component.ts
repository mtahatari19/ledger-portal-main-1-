import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ledger-portal-unsubscribable',
  template: '',
  standalone: true,
})
export class UnsubscribableComponent {
  protected destroyRef = inject(DestroyRef);
  protected takeUntilDestroyed = takeUntilDestroyed;
}
