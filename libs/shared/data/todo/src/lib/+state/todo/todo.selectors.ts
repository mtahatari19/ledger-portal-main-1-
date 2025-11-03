import { createSelector } from '@ngrx/store';
import { State, TODO_FEATURE_KEY, todoAdapter } from './todo.reducer';
import { getTaskState } from '../index';

export const getTodoState = createSelector(getTaskState, state => state[TODO_FEATURE_KEY]);

const { selectAll, selectEntities } = todoAdapter.getSelectors();

export const getTodoLoaded = createSelector(getTodoState, (state: State) => state.loaded);

export const getTodoError = createSelector(getTodoState, (state: State) => state.error);

export const getAllTodo = createSelector(getTodoState, (state: State) => selectAll(state));

export const getTodoEntities = createSelector(getTodoState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getTodoState, (state: State) => state.selectedId);

export const getSelected = createSelector(getTodoEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
