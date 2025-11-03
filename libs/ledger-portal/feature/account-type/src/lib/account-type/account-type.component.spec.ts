import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccountTypeComponent } from './account-type.component';
import { AlertService } from '@ledger-portal/shared/ui/alert';

describe('AccountTypeComponent', () => {
  let component: AccountTypeComponent;
  let fixture: ComponentFixture<AccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountTypeComponent, BrowserAnimationsModule],
      providers: [
        provideRouter([]),
        {
          provide: AlertService,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize all form groups', () => {
    expect(component.generalInfoForm).toBeDefined();
    expect(component.currenciesForm).toBeDefined();
    expect(component.orgUnitsForm).toBeDefined();
    expect(component.limitationsForm).toBeDefined();
  });

  it('should have general info form with required validators', () => {
    const form = component.generalInfoForm;
    expect(form.get('code')?.hasError('required')).toBeTruthy();
    expect(form.get('nameFa')?.hasError('required')).toBeTruthy();
    expect(form.get('accountGroup')?.hasError('required')).toBeTruthy();
    expect(form.get('subsystem')?.hasError('required')).toBeTruthy();
  });

  it('should handle currency chip change correctly', () => {
    const currency = component.availableCurrencies[0];
    const mockEvent = { value: [currency.id] } as any;
    component.onCurrencyChipChange(mockEvent);
    expect(component.isCurrencySelected(currency)).toBeTruthy();
  });

  it('should handle org unit chip change correctly', () => {
    const unit = component.availableOrgUnits[0];
    const mockEvent = { value: [unit.id] } as any;
    component.onOrgUnitChipChange(mockEvent);
    expect(component.isOrgUnitSelected(unit)).toBeTruthy();
  });

  it('should add limitation correctly', () => {
    component.limitationsForm.patchValue({
      limitType: 'item',
      relationType: 'allowed',
      selectedEntityIds: ['1'],
    });
    component.addLimitation();
    expect(component.limitations.length).toBe(1);
  });

  it('should remove limitation correctly', () => {
    component.limitationsForm.patchValue({
      limitType: 'item',
      relationType: 'allowed',
      selectedEntityIds: ['1'],
    });
    component.addLimitation();
    const limitationId = component.limitations[0].id;
    component.removeLimitation(limitationId);
    expect(component.limitations.length).toBe(0);
  });
});
