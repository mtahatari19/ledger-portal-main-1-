import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGroupAddComponent } from './account-group-add.component';

describe('AccountGroupAddComponent', () => {
  let component: AccountGroupAddComponent;
  let fixture: ComponentFixture<AccountGroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountGroupAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
