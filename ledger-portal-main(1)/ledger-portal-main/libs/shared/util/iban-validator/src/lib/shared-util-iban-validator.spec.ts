import { getBankNameByIban } from './shared-util-iban-validator';
import { BankNames } from '@ledger-portal/shared/data/vendor';

describe('sharedUtilIbanValidator', () => {
  it('should return bank for valid iban', () => {
    const bank = getBankNameByIban('IR160170000000362993035003');

    expect(bank.name).toEqual(BankNames.MELLI);
    expect(bank.isValid).toBe(true);
  });

  it('should return unknown for invalid iban', () => {
    const bank = getBankNameByIban('IR139170000000362993035003');

    expect(bank.name).toEqual(BankNames.UNKNOWN);
    expect(bank.isValid).toBe(false);
  });
});
