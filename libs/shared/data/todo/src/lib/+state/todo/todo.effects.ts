import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nx/angular';

import * as TodoActions from './todo.actions';
import * as TodoFeature from './todo.reducer';
import { TodoService } from '@ledger-portal/shared/data/todo';
import { map } from 'rxjs';

@Injectable()
export class TodoEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.init),
      fetch({
        run: (action: ReturnType<typeof TodoActions.init>, state: TodoFeature.TodoPartialState) => {
          return this.todoService.fetch().pipe(map(todo => TodoActions.loadTodoSuccess({ todo })));
        },
        onError: (action: ReturnType<typeof TodoActions.init>, error) => {
          console.error('Error', error);
          return TodoActions.loadTodoFailure({ error });
        },
      })
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      fetch({
        run: (action: ReturnType<typeof TodoActions.addTodo>, state: TodoFeature.TodoPartialState) => {
          return this.todoService.create().pipe(map(todo => TodoActions.init()));
        },
        onError: (action: ReturnType<typeof TodoActions.addTodo>, error) => {
          console.error('Error', error);
          return TodoActions.loadTodoFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private todoService: TodoService) {}
}
