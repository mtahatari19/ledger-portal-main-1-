import { DOCUMENT, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { svgIconNames as sharedSvgIconNames } from '@ledger-portal/shared/ui/icon';
import { svgIconNames as backOfficeSvgIconNames } from './constants';

export function ledgerPortalSharedUiIconRegister(): void {
  const platformId = inject(PLATFORM_ID);
  const document = inject(DOCUMENT);
  const matIconRegistry = inject(MatIconRegistry);
  const domSanitizer = inject(DomSanitizer);

  const names = Array.from(new Set([...sharedSvgIconNames, ...backOfficeSvgIconNames]));
  const baseHref = isPlatformServer(platformId) ? document.location.origin : '.';

  names.forEach(name => {
    matIconRegistry.addSvgIcon(
      name,
      domSanitizer.bypassSecurityTrustResourceUrl(`${baseHref}/assets/icons/${name}.svg`)
    );
  });
}
