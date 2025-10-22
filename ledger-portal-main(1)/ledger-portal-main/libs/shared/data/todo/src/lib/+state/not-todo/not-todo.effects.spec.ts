import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nx/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as NotTodoActions from './not-todo.actions';
import { NotTodoEffects } from './not-todo.effects';

describe('NotTodoEffects', () => {
  let actions: Observable<Action>;
  let effects: NotTodoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [NotTodoEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(NotTodoEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NotTodoActions.init() });

      const expected = hot('-a-|', { a: NotTodoActions.loadNotTodoSuccess({ notTodo: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
