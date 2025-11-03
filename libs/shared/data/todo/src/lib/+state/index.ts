import * as fromTodo from './todo/todo.reducer';
import { TODO_FEATURE_KEY, TodoPartialState } from './todo/todo.reducer';
import * as fromNotTodo from './not-todo/not-todo.reducer';
import { NOT_TODO_FEATURE_KEY, NotTodoPartialState } from './not-todo/not-todo.reducer';
import { combineReducers, createFeatureSelector } from '@ngrx/store';

export const TASK_FEATURE_KEY = 'task';

export interface TaskState extends TodoPartialState, NotTodoPartialState {}

export const reducer = combineReducers({
  [TODO_FEATURE_KEY]: fromTodo.reducer,
  [NOT_TODO_FEATURE_KEY]: fromNotTodo.reducer,
});

export const getTaskState = createFeatureSelector<TaskState>(TASK_FEATURE_KEY);
