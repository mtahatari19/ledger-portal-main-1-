import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTask from './+state';
import { TodoEffects } from './+state/todo/todo.effects';
import { TodoFacade } from './+state/todo/todo.facade';
import { TodoService } from './+state/todo/todo.service';
import { NotTodoEffects } from './+state/not-todo/not-todo.effects';
import { NotTodoFacade } from './+state/not-todo/not-todo.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTask.TASK_FEATURE_KEY, fromTask.reducer),
    EffectsModule.forFeature([TodoEffects, NotTodoEffects]),
  ],
  providers: [TodoFacade, TodoService, NotTodoFacade],
})
export class SharedDataTodoModule {}
