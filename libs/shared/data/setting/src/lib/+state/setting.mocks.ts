import { of } from 'rxjs';

export class MockSettingFacade {
  language$ = of('fa');
  colorPalette$ = of('default');
  colorScheme$ = of('dark');

  init() {
    /* noop */
  }

  changeLanguage() {
    /* noop */
  }

  changeColorPalette() {
    /* noop */
  }

  changeColorScheme() {
    /* noop */
  }
}
