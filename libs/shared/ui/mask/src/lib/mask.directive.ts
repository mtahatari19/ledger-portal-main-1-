import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ledgerPortalMask]',
  standalone: true,
})
export class MaskDirective implements AfterViewInit {
  @Input('ledgerPortalMask') maskLength = 4;
  @Input({ required: true }) startIndex!: number;
  innerText = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.applyMask();
  }

  private applyMask(): void {
    const content = this.elementRef.nativeElement.innerText || '';
    const maskedContent = this.maskString(content.trim());
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', maskedContent);
  }

  private maskString(value: string): string {
    if (value) {
      const maskedValue =
        value.substring(this.startIndex + this.maskLength) +
        '*'.repeat(this.maskLength) +
        value.substring(0, this.startIndex);
      return maskedValue;
    }
    return value;
  }
}
