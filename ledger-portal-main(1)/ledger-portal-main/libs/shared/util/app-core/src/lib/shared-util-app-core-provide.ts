import { API_ROOT, ENVIRONMENT, Environment, IMAGES_PATH, DEFAULT_API_ERROR_MESSAGE } from '@ledger-portal/shared/util/web-sdk';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export function provideSharedUtilAppCore({ imagesPath, apiRoot, ...config }: Environment): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ENVIRONMENT,
      useValue: config,
    },
    {
      provide: IMAGES_PATH,
      useValue: imagesPath,
    },
    {
      provide: API_ROOT,
      useValue: apiRoot,
    },
    {
      provide: DEFAULT_API_ERROR_MESSAGE,
      useValue: $localize`:متن خطا که زمانی به کاربر نشون داده میشه که اطلاعات مشخصی از خطا نداریم:ارائه این سرویس الان ممکن نیست، لطفا چند دقیقه دیگه دوباره تلاش کنین`,
    },
  ]);
}
