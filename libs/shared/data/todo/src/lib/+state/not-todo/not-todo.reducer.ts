import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NotTodoActions from './not-todo.actions';
import { NotTodoEntity } from './not-todo.models';

export const NOT_TODO_FEATURE_KEY = 'notTodo';

export interface State extends EntityState<NotTodoEntity> {
  selectedId?: string | number; // which NotTodo record has been selected
  loaded: boolean; // has the NotTodo list been loaded
  error?: string | null; // last known error (if any)
}

export interface NotTodoPartialState {
  readonly [NOT_TODO_FEATURE_KEY]: State;
}

export const notTodoAdapter: EntityAdapter<NotTodoEntity> = createEntityAdapter<NotTodoEntity>();

export const initialState: State = notTodoAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const notTodoReducer = createReducer(
  initialState,
  on(NotTodoActions.init, state => ({ ...state, loaded: false, error: null })),
  on(NotTodoActions.loadNotTodoSuccess, (state, { notTodo }) =>
    notTodoAdapter.setAll(notTodo, { ...state, loaded: true })
  ),
  on(NotTodoActions.loadNotTodoFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return notTodoReducer(state, action);
}
