import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[ledgerPortalIntersectionObserver]',
  standalone: true,
})
export class IntersectionObserverDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() ledgerPortalIntersectionObserver!: () => void;
  @Input() ledgerPortalIntersectionObserverOptions: IntersectionObserverInit = {};
  private observer?: IntersectionObserver;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    if (!this.ledgerPortalIntersectionObserver) {
      return;
    }

    this.observer = new IntersectionObserver(entries => {
      return entries.forEach(entry => entry.isIntersecting && this.ledgerPortalIntersectionObserver());
    }, this.ledgerPortalIntersectionObserverOptions);
  }

  ngAfterViewInit() {
    this.observer?.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.unobserve(this.element.nativeElement);
  }
}
