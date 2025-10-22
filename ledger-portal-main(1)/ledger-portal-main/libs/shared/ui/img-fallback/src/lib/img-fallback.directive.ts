import { Directive, HostListener, Input } from '@angular/core';

import { placeholder } from './img-fallback.constants';
import { FallbackImageType } from './img-fallback.model';

@Directive({
  selector: '[ledgerPortalImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  @Input() imageType: FallbackImageType = 'landscape';
  @Input() fallbackCssClass: string | null = null;

  @HostListener('error', ['$event'])
  public onError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = `./assets/images/${placeholder[this.imageType]}`;
    if (this.fallbackCssClass) {
      img.classList.add(this.fallbackCssClass);
    }
  }

  @HostListener('load', ['$event'])
  public onLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (this.fallbackCssClass && !img.src.includes(placeholder[this.imageType])) {
      img.classList.remove(this.fallbackCssClass);
    }
  }
}
