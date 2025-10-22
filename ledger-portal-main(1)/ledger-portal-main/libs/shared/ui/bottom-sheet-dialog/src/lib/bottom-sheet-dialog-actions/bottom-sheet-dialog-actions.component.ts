import { Component, HostBinding, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'ledger-portal-bottom-sheet-dialog-actions',
  templateUrl: './bottom-sheet-dialog-actions.component.html',
  standalone: true,
})
export class BottomSheetDialogActionsComponent {
  @Input() align: MatDialogActions['align'] = 'start';
  @HostBinding('class') cls = 'bottom-sheet-dialog-actions';
  isHandsetScreen$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
