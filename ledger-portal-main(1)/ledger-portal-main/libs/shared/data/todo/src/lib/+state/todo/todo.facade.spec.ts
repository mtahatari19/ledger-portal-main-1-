import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nx/angular';
import { readFirst } from '@nx/angular/testing';

import * as TodoActions from './todo.actions';
import { TodoEffects } from './todo.effects';
import { TodoFacade } from './todo.facade';
import { TodoEntity } from './todo.models';
import { State } from './todo.reducer';
import { TodoService } from '@ledger-portal/shared/data/todo';
import { ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';
import { environment } from '../../../../../../../../apps/retail/src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as fromTask from '../index';

interface TestSchema {
  todo: State;
}

describe('TodoFacade', () => {
  let facade: TodoFacade;
  let store: Store<TestSchema>;
  const createTodoEntity = (id: string, name = ''): TodoEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(fromTask.TASK_FEATURE_KEY, fromTask.reducer),
          EffectsModule.forFeature([TodoEffects]),
        ],
        providers: [
          TodoFacade,
          TodoService,
          {
            provide: ENVIRONMENT,
            useValue: environment,
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}

      TestBed.configureTestingModule({
        imports: [RootModule, HttpClientTestingModule],
      });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TodoFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTodo$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTodo$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);
    });

    /**
     * Use `loadTodoSuccess` to manually update list
     */
    it('allTodo$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTodo$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TodoActions.loadTodoSuccess({
          todo: [createTodoEntity('AAA'), createTodoEntity('BBB')],
        })
      );

      list = await readFirst(facade.allTodo$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
