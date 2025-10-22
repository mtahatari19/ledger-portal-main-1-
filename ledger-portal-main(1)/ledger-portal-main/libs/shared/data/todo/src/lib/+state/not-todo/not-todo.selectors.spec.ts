import { NotTodoEntity } from './not-todo.models';
import { notTodoAdapter, NotTodoPartialState, initialState } from './not-todo.reducer';
import * as NotTodoSelectors from './not-todo.selectors';
import { TASK_FEATURE_KEY, TaskState } from '../index';

describe('NotTodo Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNotTodoId = (it: NotTodoEntity) => it.id;
  const createNotTodoEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NotTodoEntity);

  let state: { [TASK_FEATURE_KEY]: Partial<TaskState> };

  beforeEach(() => {
    state = {
      task: {
        notTodo: notTodoAdapter.setAll(
          [createNotTodoEntity('PRODUCT-AAA'), createNotTodoEntity('PRODUCT-BBB'), createNotTodoEntity('PRODUCT-CCC')],
          {
            ...initialState,
            selectedId: 'PRODUCT-BBB',
            error: ERROR_MSG,
            loaded: true,
          }
        ),
      },
    };
  });

  describe('NotTodo Selectors', () => {
    it('getAllNotTodo() should return the list of NotTodo', () => {
      const results = NotTodoSelectors.getAllNotTodo(state);
      const selId = getNotTodoId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = NotTodoSelectors.getSelected(state) as NotTodoEntity;
      const selId = getNotTodoId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getNotTodoLoaded() should return the current "loaded" status', () => {
      const result = NotTodoSelectors.getNotTodoLoaded(state);

      expect(result).toBe(true);
    });

    it('getNotTodoError() should return the current "error" state', () => {
      const result = NotTodoSelectors.getNotTodoError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
