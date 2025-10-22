import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nx/angular';
import { readFirst } from '@nx/angular/testing';

import * as NotTodoActions from './not-todo.actions';
import { NotTodoEffects } from './not-todo.effects';
import { NotTodoFacade } from './not-todo.facade';
import { NotTodoEntity } from './not-todo.models';
import { NOT_TODO_FEATURE_KEY, State, initialState, reducer } from './not-todo.reducer';
import * as NotTodoSelectors from './not-todo.selectors';
import * as fromTask from '../index';

interface TestSchema {
  notTodo: State;
}

describe('NotTodoFacade', () => {
  let facade: NotTodoFacade;
  let store: Store<TestSchema>;
  const createNotTodoEntity = (id: string, name = ''): NotTodoEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(fromTask.TASK_FEATURE_KEY, fromTask.reducer),
          EffectsModule.forFeature([NotTodoEffects]),
        ],
        providers: [NotTodoFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(NotTodoFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allNotTodo$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allNotTodo$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadNotTodoSuccess` to manually update list
     */
    it('allNotTodo$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allNotTodo$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        NotTodoActions.loadNotTodoSuccess({
          notTodo: [createNotTodoEntity('AAA'), createNotTodoEntity('BBB')],
        })
      );

      list = await readFirst(facade.allNotTodo$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
