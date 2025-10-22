import { Action } from '@ngrx/store';

import * as NotTodoActions from './not-todo.actions';
import { NotTodoEntity } from './not-todo.models';
import { State, initialState, reducer } from './not-todo.reducer';

describe('NotTodo Reducer', () => {
  const createNotTodoEntity = (id: string, name = ''): NotTodoEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid NotTodo actions', () => {
    it('loadNotTodoSuccess should return the list of known NotTodo', () => {
      const notTodo = [createNotTodoEntity('PRODUCT-AAA'), createNotTodoEntity('PRODUCT-zzz')];
      const action = NotTodoActions.loadNotTodoSuccess({ notTodo });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
