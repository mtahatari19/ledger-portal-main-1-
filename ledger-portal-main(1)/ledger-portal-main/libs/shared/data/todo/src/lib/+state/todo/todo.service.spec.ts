import { TodoService } from './todo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';
import { TestBed } from '@angular/core/testing';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ENVIRONMENT,
          useValue: {
            apiRoot: '/api',
          },
        },
        TodoService,
      ],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
