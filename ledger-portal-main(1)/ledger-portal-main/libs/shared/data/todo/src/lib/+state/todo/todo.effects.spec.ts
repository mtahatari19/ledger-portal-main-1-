import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nx/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TodoActions from './todo.actions';
import { TodoEffects } from './todo.effects';
import { TodoService } from '@ledger-portal/shared/data/todo';
import { ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../../../../../../apps/retail/src/environments/environment';

describe('TodoEffects', () => {
  let actions: Observable<Action>;
  let effects: TodoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [
        TodoEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        TodoService,
        {
          provide: ENVIRONMENT,
          useValue: environment,
        },
      ],
    });

    effects = TestBed.inject(TodoEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TodoActions.init() });
      expect(effects.init$).toBeDefined();
    });
  });
});
