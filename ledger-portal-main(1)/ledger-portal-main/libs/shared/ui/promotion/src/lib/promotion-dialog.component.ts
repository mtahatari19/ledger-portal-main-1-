import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DomSanitizer } from '@angular/platform-browser';

import { SharedUiFullScreenDialogModule } from '@ledger-portal/shared/ui/full-screen-dialog';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

import { PromotionContent } from './promotion-dialog.models';

@Component({
  selector: 'ledger-portal-promotion-dialog',
  imports: [
    SharedUiFullScreenDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    SvgIconTypeDirective,
    NgOptimizedImage,
  ],
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss'],
})
export class PromotionDialogComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private matIconRegistry = inject(MatIconRegistry);
  private data = inject<{ content: PromotionContent; submission: () => void }>(MAT_DIALOG_DATA);
  content = this.data.content;

  ngOnInit() {
    this.content.body.forEach(item => {
      this.matIconRegistry.addSvgIcon(
        `${item.subject}-icon`,
        this.sanitizer.bypassSecurityTrustResourceUrl(item.iconUrl)
      );
    });
  }
}
