import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment, ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';
import { TodoEntity } from '@ledger-portal/shared/data/todo';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {
  url = this.environment.apiRoot;

  constructor(@Inject(ENVIRONMENT) private environment: Environment, private http: HttpClient) {}

  fetch(): Observable<TodoEntity[]> {
    return this.http.get<TodoEntity[]>(this.url + '/todos');
  }

  create(): Observable<Object> {
    return this.http.post(this.url + '/addTodo', null);
  }
}
