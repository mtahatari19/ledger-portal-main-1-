import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDeleteDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'ledger-portal-confirm-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title class="text-xl font-bold">{{ data.title }}</h2>
    <mat-dialog-content class="py-6">
      <p class="text-base">{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="flex justify-end px-6 pb-4">
      <button mat-stroked-button type="button" (click)="onCancel()" class="px-6">انصراف</button>
      <button mat-raised-button color="warn" type="button" (click)="onConfirm()" class="px-6">حذف</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDeleteDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDeleteDialogComponent>);
  data = inject<ConfirmDeleteDialogData>(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
