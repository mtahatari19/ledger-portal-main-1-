import { BankNames, VendorValidatorReturn } from '@ledger-portal/shared/data/vendor';
import { getBankNameByIban } from '@ledger-portal/shared/util/iban-validator';
import { isMelliAccountNumber } from '@ledger-portal/shared/util/account-validator';


export const cardRules = [
  { name: BankNames.MELLI, rule: /^603799\d{10}$/g },
  { name: BankNames.MARKAZI, rule: /^636795\d{10}$/g },
  { name: BankNames.SANAT_MADAN, rule: /^627961\d{10}$/g },
  { name: BankNames.MELLAT, rule: /^610433\d{10}$/g },
  { name: BankNames.MELLAT, rule: /^991975\d{10}$/g },
  { name: BankNames.REFAH, rule: /^589463\d{10}$/g },
  { name: BankNames.MASKAN, rule: /^628023\d{10}$/g },
  { name: BankNames.SEPAH, rule: /^589210\d{10}$/g },
  { name: BankNames.SEPAH, rule: /^589210\d{10}$/g },
  { name: BankNames.KESHAVARZI, rule: /^603770\d{10}$/g },
  { name: BankNames.KESHAVARZI, rule: /^639217\d{10}$/g },
  { name: BankNames.TEJARAT, rule: /^585983\d{10}$/g },
  { name: BankNames.TEJARAT, rule: /^627353\d{10}$/g },
  { name: BankNames.SADERAT, rule: /^603769\d{10}$/g },
  { name: BankNames.TOSEE_SADERAT, rule: /^627648\d{10}$/g },
  { name: BankNames.TOSEE_SADERAT, rule: /^207177\d{10}$/g },
  { name: BankNames.POST, rule: /^627760\d{10}$/g },
  { name: BankNames.TOSEE_TAAVON, rule: /^502908\d{10}$/g },
  { name: BankNames.TOSEE_TAAVON, rule: /^628157\d{10}$/g },
  { name: BankNames.QAVAMIN, rule: /^639599\d{10}$/g },
  { name: BankNames.KARAFARIN, rule: /^627488\d{10}$/g },
  { name: BankNames.KARAFARIN, rule: /^502910\d{10}$/g },
  { name: BankNames.PARSIAN, rule: /^622106\d{10}$/g },
  { name: BankNames.PARSIAN, rule: /^639194\d{10}$/g },
  { name: BankNames.PARSIAN, rule: /^627884\d{10}$/g },
  { name: BankNames.EQTESAD_NOVIN, rule: /^627412\d{10}$/g },
  { name: BankNames.SAMAN, rule: /^621986\d{10}$/g },
  { name: BankNames.PASARGAD, rule: /^639347\d{10}$/g },
  { name: BankNames.PASARGAD, rule: /^502229\d{10}$/g },
  { name: BankNames.SARMAYEH, rule: /^639607\d{10}$/g },
  { name: BankNames.SINA, rule: /^639346\d{10}$/g },
  { name: BankNames.MEHR_IRAN, rule: /^606373\d{10}$/g },
  { name: BankNames.MEHR_IRAN, rule: /^606373\d{10}$/g },
  { name: BankNames.MEHR_EQTESAD, rule: /^639370\d{10}$/g },
  { name: BankNames.MEHR_EQTESAD, rule: /^639370\d{10}$/g },
  { name: BankNames.SHAHR, rule: /^502806\d{10}$/g },
  { name: BankNames.SHAHR, rule: /^504706\d{10}$/g },
  { name: BankNames.AYANDEH, rule: /^636214\d{10}$/g },
  { name: BankNames.ANSAR, rule: /^627381\d{10}$/g },
  { name: BankNames.GARDESHGARI, rule: /^505416\d{10}$/g },
  { name: BankNames.GARDESHGARI, rule: /^505416\d{10}$/g },
  { name: BankNames.HEKMAT, rule: /^636949\d{10}$/g },
  { name: BankNames.DEY, rule: /^502938\d{10}$/g },
  { name: BankNames.IRAN_ZAMIN, rule: /^505785\d{10}$/g },
  { name: BankNames.RESALAT, rule: /^504172\d{10}$/g },
  { name: BankNames.KOSAR, rule: /^505801\d{10}$/g },
  { name: BankNames.MELAL, rule: /^606256\d{10}$/g },
  { name: BankNames.KHAVAR_MIANEH, rule: /^585947\d{10}$/g },
  { name: BankNames.UNKNOWN, rule: /^UNKNOWN$/g },
];


export function getBankNameByCardNumber(cardNumber?: string): VendorValidatorReturn {
  const bankName = cardRules.find(card => {
    const regexp = new RegExp(card.rule);
    return regexp.test(cardNumber || '');
  });

  return {
    isValid: Boolean(bankName && bankName?.name !== BankNames.UNKNOWN),
    name: bankName?.name ?? BankNames.UNKNOWN,
  };
}

export function getAccountBankName(value: string) {
  const ibanBankName = getBankNameByIban(value);
  const cardBankName = getBankNameByCardNumber(value);

  return isMelliAccountNumber(value)
    ? BankNames.MELLI
    : ibanBankName.isValid
      ? ibanBankName.name
      : cardBankName.isValid
        ? cardBankName.name
        : BankNames.UNKNOWN;
}
