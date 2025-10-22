import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ToggleColorSchemeComponent } from './toggle-color-scheme.component';

describe('ToggleColorSchemeComponent', () => {
  let component: ToggleColorSchemeComponent;
  let fixture: ComponentFixture<ToggleColorSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleColorSchemeComponent],
      imports: [MatIconModule, MatIconTestingModule, MatSlideToggleModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleColorSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
