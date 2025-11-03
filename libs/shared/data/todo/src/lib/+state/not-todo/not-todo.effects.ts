import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nx/angular';

import * as NotTodoActions from './not-todo.actions';
import * as NotTodoFeature from './not-todo.reducer';

@Injectable()
export class NotTodoEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotTodoActions.init),
      fetch({
        run: (action: ReturnType<typeof NotTodoActions.init>, state: NotTodoFeature.NotTodoPartialState) => {
          return NotTodoActions.loadNotTodoSuccess({ notTodo: [] });
        },
        onError: (action: ReturnType<typeof NotTodoActions.init>, error) => {
          console.error('Error', error);
          return NotTodoActions.loadNotTodoFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
