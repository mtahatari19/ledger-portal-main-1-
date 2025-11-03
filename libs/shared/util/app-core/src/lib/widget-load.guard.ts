// import { CanMatchFn, Router } from '@angular/router';
// import { menuItems } from '@ledger-portal/retail/data/menu';
// import { inject } from '@angular/core';
// import { ENVIRONMENT, Environment } from '@ledger-portal/shared/util/web-sdk';
//
// export const widgetLoadGuard = (widgetId: (typeof menuItems)[number]['id']): CanMatchFn => {
//   return () => {
//     const router = inject(Router);
//     const environment: Environment<(typeof menuItems)[number]['id']> = inject(ENVIRONMENT);
//
//     if (widgetId && environment.widgetsLoadStatus?.[widgetId] === false) {
//       return router.parseUrl('/console/home');
//     }
//
//     return true;
//   };
// };
