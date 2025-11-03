import { inject, Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import * as TodoFeature from './todo.reducer';
import * as TodoSelectors from './todo.selectors';

@Injectable()
export class TodoFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.select(TodoSelectors.getTodoLoaded);
  allTodo$ = this.store.select(TodoSelectors.getAllTodo);
  selectedTodo$ = this.store.select(TodoSelectors.getSelected);

  private readonly store = inject(Store);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TodoActions.init());
  }

  addTodo() {
    this.store.dispatch(TodoActions.addTodo());
  }
}
