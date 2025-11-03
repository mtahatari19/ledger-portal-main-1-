// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { inject, LOCALE_ID } from '@angular/core';
//
// import { catchError, throwError } from 'rxjs';
//
// import { AuthFacade } from '@ledger-portal/shared/data/auth';
// import { AlertService } from '@ledger-portal/shared/ui/alert';
//
// export const customHttpInterceptor: HttpInterceptorFn = (request, next) => {
//   const authFacade = inject(AuthFacade);
//   const alert = inject(AlertService);
//   const localeId = inject(LOCALE_ID);
//
//   request = request.clone({
//     withCredentials: true,
//     setHeaders: {
//       'X-LOCALE-ID': localeId,
//     },
//   });
//
//   return next(request).pipe(
//     catchError(error => {
//       if (error instanceof HttpErrorResponse) {
//         if (error.status === 401) {
//           alert.open(
//             $localize`:پیغامی که در هنledger-portal خروج خودکار نمایش داده می‌شود:برای دسترسی به ledger-portal نیازه که دوباره به سیستم وارد بشین`
//           );
//           authFacade.kickOut();
//         }
//       }
//       return throwError(error);
//     })
//   );
// };
