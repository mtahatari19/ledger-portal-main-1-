import { BankNames, VendorValidatorReturn } from '@ledger-portal/shared/data/vendor';

export function getBankNameByIban(ibanNumber?: string): VendorValidatorReturn {
  const bankName = ibanRules.find(iban => {
    const regexp = new RegExp(iban.rule);
    return regexp.test(ibanNumber ?? '');
  });

  return {
    isValid: bankName ? bankName?.name !== BankNames.UNKNOWN : false,
    name: bankName?.name ?? BankNames.UNKNOWN,
  };
}

const ibanRules = [
  { name: BankNames.MARKAZI, rule: /^IR\d{2}010/gi },
  { name: BankNames.SANAT_MADAN, rule: /^IR\d{2}011/gi },
  { name: BankNames.MELLAT, rule: /^IR\d{2}012/gi },
  { name: BankNames.REFAH, rule: /^IR\d{2}013/gi },
  { name: BankNames.MASKAN, rule: /^IR\d{2}014/gi },
  { name: BankNames.SEPAH, rule: /^IR\d{2}015/gi },
  { name: BankNames.KESHAVARZI, rule: /^IR\d{2}016/gi },
  { name: BankNames.MELLI, rule: /^IR\d{2}017/gi },
  { name: BankNames.TEJARAT, rule: /^IR\d{2}018/gi },
  { name: BankNames.SADERAT, rule: /^IR\d{2}019/gi },
  { name: BankNames.TOSEE_SADERAT, rule: /^IR\d{2}020/gi },
  { name: BankNames.POST, rule: /^IR\d{2}021/gi },
  { name: BankNames.TOSEE_TAAVON, rule: /^IR\d{2}022/gi },
  { name: BankNames.ETEBARI_TOSEE, rule: /^IR\d{2}051/gi },
  { name: BankNames.QAVAMIN, rule: /^IR\d{2}052/gi },
  { name: BankNames.KARAFARIN, rule: /^IR\d{2}053/gi },
  { name: BankNames.PARSIAN, rule: /^IR\d{2}054/gi },
  { name: BankNames.EQTESAD_NOVIN, rule: /^IR\d{2}055/gi },
  { name: BankNames.SAMAN, rule: /^IR\d{2}056/gi },
  { name: BankNames.PASARGAD, rule: /^IR\d{2}057/gi },
  { name: BankNames.SARMAYEH, rule: /^IR\d{2}058/gi },
  { name: BankNames.SINA, rule: /^IR\d{2}059/gi },
  { name: BankNames.MEHR_IRAN, rule: /^IR\d{2}060/gi },
  { name: BankNames.MEHR_EQTESAD, rule: /^IR\d{2}010/gi },
  { name: BankNames.SHAHR, rule: /^IR\d{2}061/gi },
  { name: BankNames.AYANDEH, rule: /^IR\d{2}062/gi },
  { name: BankNames.ANSAR, rule: /^IR\d{2}063/gi },
  { name: BankNames.GARDESHGARI, rule: /^IR\d{2}064/gi },
  { name: BankNames.HEKMAT, rule: /^IR\d{2}065/gi },
  { name: BankNames.DEY, rule: /^IR\d{2}066/gi },
  { name: BankNames.IRAN_ZAMIN, rule: /^IR\d{2}069/gi },
  { name: BankNames.RESALAT, rule: /^IR\d{2}070/gi },
  { name: BankNames.KOSAR, rule: /^IR\d{2}073/gi },
  { name: BankNames.MELAL, rule: /^IR\d{2}075/gi },
  { name: BankNames.KHAVAR_MIANEH, rule: /^IR\d{2}078/gi },
  { name: BankNames.NOOR, rule: /^IR\d{2}080/gi },
  { name: BankNames.IRAN_VENEZUELA, rule: /^IR\d{2}095/gi },
  { name: BankNames.UNKNOWN, rule: /^UNKNOWN$/gi },
];
