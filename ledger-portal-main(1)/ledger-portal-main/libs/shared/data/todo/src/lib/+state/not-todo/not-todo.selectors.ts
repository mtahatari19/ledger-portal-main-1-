import { createSelector } from '@ngrx/store';
import { NOT_TODO_FEATURE_KEY, notTodoAdapter, State } from './not-todo.reducer';
import { getTaskState } from '../index';

export const getNotTodoState = createSelector(getTaskState, state => state[NOT_TODO_FEATURE_KEY]);

const { selectAll, selectEntities } = notTodoAdapter.getSelectors();

export const getNotTodoLoaded = createSelector(getNotTodoState, (state: State) => state.loaded);

export const getNotTodoError = createSelector(getNotTodoState, (state: State) => state.error);

export const getAllNotTodo = createSelector(getNotTodoState, (state: State) => selectAll(state));

export const getNotTodoEntities = createSelector(getNotTodoState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getNotTodoState, (state: State) => state.selectedId);

export const getSelected = createSelector(getNotTodoEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
