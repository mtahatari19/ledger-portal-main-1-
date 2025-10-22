import { Directive, ElementRef, Input } from '@angular/core';
import { SvgIconType } from './svg-icon-type.models';

@Directive({
  selector: '[ledgerPortalSvgIconType]',
  standalone: true,
})
export class SvgIconTypeDirective {
  protected _svgIconType: SvgIconType = 'fill';

  @Input('ledgerPortalSvgIconType')
  get svgIconType(): SvgIconType {
    return this._svgIconType;
  }

  set svgIconType(type: SvgIconType) {
    this._svgIconType = type;
    const classes = this.elementRef.nativeElement.classList;
    classes.remove('stroke-current', 'fill-current');
    classes.add(type + '-current');
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}
}
