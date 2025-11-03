import { ANIMATION_MODULE_TYPE, Inject, Injectable, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_DIALOG_SCROLL_STRATEGY,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ComponentType, Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Location } from '@angular/common';

const defaultDialogConfig = new MatDialogConfig();

@Injectable()
export class FullScreenDialog extends MatDialog {
  constructor(
    private breakpointObserver: BreakpointObserver,
    overlay: Overlay,
    injector: Injector,
    @Optional() _location: Location,
    @Optional() @Inject(MAT_DIALOG_DEFAULT_OPTIONS) defaultOptions: MatDialogConfig,
    @Inject(MAT_DIALOG_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @SkipSelf() parentDialog: MatDialog,
    overlayContainer: OverlayContainer,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: 'NoopAnimations' | 'BrowserAnimations'
  ) {
    super(overlay, injector, _location, defaultOptions, scrollStrategy, parentDialog, overlayContainer, animationMode);
  }

  override open<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R>;
  override open<T, D = any, R = any>(template: TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R>;
  override open<T, D = any, R = any>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    { panelClass, ...config }: MatDialogConfig<D> = {}
  ): MatDialogRef<T, R> {
    const isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset);

    return super.open(componentOrTemplate, {
      ...config,
      panelClass: isHandset
        ? [
            'mat-mdc-full-screen-dialog',
            ...(typeof panelClass === 'string' ? [panelClass] : Array.isArray(panelClass) ? panelClass : ['']),
          ]
        : panelClass,
      minWidth: isHandset ? undefined : config.minWidth ?? defaultDialogConfig.minWidth,
      maxWidth: isHandset ? undefined : config.maxWidth ?? defaultDialogConfig.maxWidth,
      minHeight: isHandset ? undefined : config.minHeight ?? defaultDialogConfig.minHeight,
      maxHeight: isHandset ? undefined : config.maxHeight ?? defaultDialogConfig.maxHeight,
    });
  }
}
