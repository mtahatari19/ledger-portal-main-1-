import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutingProgressIndicatorComponent } from './routing-progress-indicator.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RoutingProgressIndicatorComponent', () => {
  let component: RoutingProgressIndicatorComponent;
  let fixture: ComponentFixture<RoutingProgressIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutingProgressIndicatorComponent],
      imports: [RouterTestingModule, MatProgressBarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
