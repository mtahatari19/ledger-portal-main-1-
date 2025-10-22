import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { FullScreenDialogComponent } from './full-screen-dialog/full-screen-dialog.component';
import { FullScreenDialog } from './full-screen-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    SvgIconTypeDirective,
    MatTooltipModule,
    FullScreenDialogComponent,
  ],
  providers: [FullScreenDialog],
  exports: [FullScreenDialogComponent],
})
export class SharedUiFullScreenDialogModule {}
