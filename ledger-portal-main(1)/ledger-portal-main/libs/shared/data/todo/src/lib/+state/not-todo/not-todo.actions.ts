import { createAction, props } from '@ngrx/store';
import { NotTodoEntity } from './not-todo.models';

export const init = createAction('[NotTodo Page] Init');

export const loadNotTodoSuccess = createAction(
  '[NotTodo/API] Load NotTodo Success',
  props<{ notTodo: NotTodoEntity[] }>()
);

export const loadNotTodoFailure = createAction('[NotTodo/API] Load NotTodo Failure', props<{ error: any }>());
