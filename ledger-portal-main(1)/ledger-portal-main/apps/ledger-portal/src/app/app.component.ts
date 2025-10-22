import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingFacade } from '@ledger-portal/shared/data/setting';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    imports: [RouterModule],
    selector: 'ledger-portal-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private settingFacade = inject(SettingFacade);
  private destroyRef = inject(DestroyRef);
  title = 'ledger-portal';

  ngOnInit(): void {
    this.setInnerHeightCSSVariable();
    fromEvent(window, 'resize').pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.setInnerHeightCSSVariable);
    this.settingFacade.init();
  }

  private setInnerHeightCSSVariable() {
    const doc = document.documentElement;
    doc.style.setProperty('--vh', window.innerHeight + 'px');
  }
}
