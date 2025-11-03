import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { widgetLoadGuard } from './widget-load.guard';

describe('widgetLoadGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => widgetLoadGuard('card-issuance')(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
