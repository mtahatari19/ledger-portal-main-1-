import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, NavigationSkipped, NavigationSkippedCode, Router, Routes } from '@angular/router';

import { SvgIconTypeDirective } from '@ledger-portal/shared/ui/icon';

import { LedgerPortalBreadcrumb } from '../ledger-portal-shared-ui-breadcrumb.model';

@Component({
  selector: 'ledger-portal-shared-ui-breadcrumb',
  imports: [CommonModule, MatIconModule, SvgIconTypeDirective],
  templateUrl: './ledger-portal-shared-ui-breadcrumb.component.html',
  styleUrl: './ledger-portal-shared-ui-breadcrumb.component.scss',
})
export class LedgerPortalSharedUiBreadcrumbComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  currentRoute = this.router.url;
  routes: Routes | undefined;
  titlesAndPaths: LedgerPortalBreadcrumb[] = [];

  ngOnInit() {
    this.findBreadcrumbTitle(this.router.url.slice(1), this.router.config);
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.titlesAndPaths = [];
        this.findBreadcrumbTitle(res.url.slice(1), this.router.config);
      } else if (
        res instanceof NavigationSkipped &&
        res.code === NavigationSkippedCode.IgnoredSameUrlNavigation &&
        this.currentRoute !== res.url
      ) {
        this.titlesAndPaths = [];
        this.findBreadcrumbTitle(res.url.slice(1), this.router.config);
      }

      if (this.titlesAndPaths.length === 1 && this.titlesAndPaths[0].path === 'console') {
        this.titlesAndPaths.push({
          title: 'داشبورد',
          path: 'home',
        });
      }
    });
  }

  //eslint-disable-next-line  @typescript-eslint/no-explicit-any
  findBreadcrumbTitle(urls: string, routes: any): any {
    if (!urls.length) {
      return this.titlesAndPaths;
    }
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path === 'auth') {
        continue;
      }
      let normalizedRoute = routes[i].path;
      const indexOfParam = routes[i].path.indexOf(':');
      const numberOfParams = routes[i].path.split(':').length - 1;
      if (indexOfParam !== -1) {
        normalizedRoute = routes[i].path.slice(0, indexOfParam - 2);
      }
      const hasRoute = routes[i].path ? urls.split('?')[0].includes(normalizedRoute) : false;
      if (hasRoute) {
        this.titlesAndPaths.push({ title: routes[i].data?.['breadcrumbTitle'], path: routes[i].path });
        const newUrls = urls
          .split('/')
          .slice(numberOfParams + 1)
          .join('/');
        const nextRoutes = routes[i]._loadedRoutes || routes[i].children || [];
        return this.findBreadcrumbTitle(newUrls, nextRoutes);
      }
    }
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children) {
        return this.findBreadcrumbTitle(urls, routes[i].children);
      }
    }
  }

  redirect(path: string) {
    let normalizedPath = path;
    const numberOfParams = path.split(':').length - 1;
    const indexOfParam = path.indexOf(':');
    if (indexOfParam !== -1) {
      normalizedPath = path.slice(0, indexOfParam - 1);
    }
    const routeParts = this.currentRoute.split(normalizedPath);
    const indexOfNormalizedPath = this.router.url.indexOf(normalizedPath);
    let nextRoute = '';
    if (indexOfNormalizedPath !== -1) {
      nextRoute = this.currentRoute.substring(0, indexOfNormalizedPath + normalizedPath.length);
    }
    if (numberOfParams >= 1) {
      for (let i = 1; i <= numberOfParams; i++) {
        nextRoute += '/' + routeParts[1].split('/')[i];
      }
    }
    if (nextRoute.split('?')[0].length === this.currentRoute.split('?')[0].length) {
      return;
    }
    this.router.navigate([nextRoute]);
  }
}
