import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as NotTodoActions from './not-todo.actions';
import * as NotTodoFeature from './not-todo.reducer';
import * as NotTodoSelectors from './not-todo.selectors';

@Injectable()
export class NotTodoFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(NotTodoSelectors.getNotTodoLoaded));
  allNotTodo$ = this.store.pipe(select(NotTodoSelectors.getAllNotTodo));
  selectedNotTodo$ = this.store.pipe(select(NotTodoSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(NotTodoActions.init());
  }
}
