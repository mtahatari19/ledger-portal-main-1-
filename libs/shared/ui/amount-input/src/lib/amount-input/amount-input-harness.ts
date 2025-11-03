import { TestElement } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';

export class AmountInputHarness extends MatInputHarness {
  static override hostSelector = 'ledger-portal-amount-input';

  override async host(): Promise<TestElement> {
    const testElement = await this.locatorFactory.locatorForOptional('input')();

    if (!testElement) {
      throw new Error('no input for ledger-portal-amount-input');
    }

    return testElement;
  }
}
