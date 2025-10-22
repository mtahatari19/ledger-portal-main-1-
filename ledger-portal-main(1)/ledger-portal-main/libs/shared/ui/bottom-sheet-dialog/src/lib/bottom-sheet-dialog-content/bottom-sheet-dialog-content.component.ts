import { Component, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';

@Component({
    selector: 'ledger-portal-bottom-sheet-dialog-content',
    templateUrl: './bottom-sheet-dialog-content.component.html',
    imports: [NgTemplateOutlet, MatDialogModule, AsyncPipe]
})
export class BottomSheetDialogContentComponent {
  @HostBinding('class') cls = 'bottom-sheet-dialog-content';
  isHandsetScreen$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
