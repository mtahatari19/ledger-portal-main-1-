import { Action } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { TodoEntity } from './todo.models';
import { State, initialState, reducer } from './todo.reducer';

describe('Todo Reducer', () => {
  const createTodoEntity = (id: string, name = ''): TodoEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Todo actions', () => {
    it('loadTodoSuccess should return the list of known Todo', () => {
      const todo = [createTodoEntity('PRODUCT-AAA'), createTodoEntity('PRODUCT-zzz')];
      const action = TodoActions.loadTodoSuccess({ todo });

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
