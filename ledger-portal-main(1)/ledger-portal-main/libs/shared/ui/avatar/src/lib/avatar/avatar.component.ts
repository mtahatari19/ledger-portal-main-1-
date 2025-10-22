import { Component, ElementRef, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafeUrl } from '@angular/platform-browser';

import { RetailSharedUiCameraDialogComponent } from '@ledger-portal/retail/shared/ui/camera';
import { AlertService } from '@ledger-portal/shared/ui/alert';
import { FullScreenDialog } from '@ledger-portal/shared/ui/full-screen-dialog';
import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';
import { OverlaySpinnerDirective } from '@ledger-portal/shared/ui/spinner';

@Component({
    selector: 'ledger-portal-avatar',
    imports: [
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
        OverlaySpinnerDirective,
        MatIconModule,
        SvgIconTypeDirective,
        RetailSharedUiCameraDialogComponent,
    ],
    templateUrl: './avatar.component.html'
})
export class AvatarComponent {
  alert = inject(AlertService);
  private fullScreenDialog = inject(FullScreenDialog);
  readonly FULL_SCREEN_DIALOG_SIZE = 480;

  @Input({ required: true }) avatar?: string | SafeUrl;
  @Input({ required: true }) name!: string;
  @Input() uploadingPhoto?: boolean;
  @Input() removingPhoto?: boolean;
  @Input() editable = false;
  @Input() maxByteUploadSize = 512000;
  @Output() uploadPhoto = new EventEmitter<File | undefined>();

  @ViewChild('uploadPhotoInput') uploadPhotoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('avatarCameraDialog') cameraDialog!: TemplateRef<unknown>;

  get tooltipText() {
    return this.editable ? (this.avatar ? $localize`ویرایش عکس` : $localize`بارگذاری عکس`) : '';
  }

  openCameraDialog = () => {
    this.fullScreenDialog.open(this.cameraDialog, {
      width: this.FULL_SCREEN_DIALOG_SIZE + 'px',
      autoFocus: 'dialog',
      data: {
        dialogType: 'PHOTO',
        uploadFileType: 'TAKE_PHOTO',
        cameraFrame: './assets/images/signup/camera-frame-signature.svg',
        preferredCameraFacingMode: 'environment',
        dialogWidthSize: this.FULL_SCREEN_DIALOG_SIZE,
      },
    });
  };

  paymentCardPhotoCaptured(blobImage: Blob) {
    if (!blobImage) return;
    const blobType = blobImage.type.trim().replace('image/', '');
    const imageFile = new File([blobImage], 'gam-avatar-' + new Date().getTime() + '.' + blobType);

    this.uploadPhoto.emit(imageFile);
  }

  openFilePicker = () => {
    this.uploadPhotoInput.nativeElement.click();
  };

  _emitUploadPhoto(file: File | undefined) {
    if (file && file.size > this.maxByteUploadSize) {
      this.alert.open(
        $localize`:متن خطای آپلود عکس آواتار که هنledger-portalی که فایل انتخاب شده حجم بالاتر از حداکثر ست شده داشته باشه نشون کاربر داده میشه:حجم عکس انتخاب شده باید کمتر از ${
          this.maxByteUploadSize / 1024
        } کیلوبایت باشه`
      );
      return;
    }

    this.uploadPhoto.emit(file);
  }
}
