/**
 * Bank codes mapping for Iranian banks
 */
const BANK_CODES: Record<string, string> = {
  '010': 'بانک مرکزی',
  '011': 'بانک صنعت و معدن',
  '012': 'بانک ملت',
  '013': 'بانک رفاه',
  '014': 'بانک مسکن',
  '015': 'بانک سپه',
  '016': 'بانک کشاورزی',
  '017': 'بانک ملی ایران',
  '018': 'بانک تجارت',
  '019': 'بانک صادرات',
  '020': 'بانک توسعه صادرات',
  '021': 'بانک پست بانک',
  '022': 'بانک توسعه تعاون',
  '051': 'بانک موسسه اعتباری توسعه',
  '052': 'بانک قرض‌الحسنه رسالت',
  '053': 'بانک کارآفرین',
  '054': 'بانک پارسیان',
  '055': 'بانک اقتصاد نوین',
  '056': 'بانک سامان',
  '057': 'بانک پاسارگاد',
  '058': 'بانک سرمایه',
  '059': 'بانک سینا',
  '060': 'بانک قرض‌الحسنه مهر ایران',
  '061': 'بانک شهر',
  '062': 'بانک آینده',
  '063': 'بانک انصار',
  '064': 'بانک گردشگری',
  '065': 'بانک حکمت ایرانیان',
  '066': 'بانک دی',
  '069': 'بانک ایران زمین',
  '070': 'بانک رسالت',
  '073': 'بانک کوثر',
  '075': 'بانک مهر اقتصاد',
};

/**
 * Gets the bank name from an IBAN number
 * @param iban - The IBAN number (with or without IR prefix)
 * @returns The bank name or empty string if not found
 */
export function getBankNameByIban(iban: string): string {
  if (!iban) {
    return '';
  }

  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  
  // Iranian IBAN format: IR + 2 check digits + 3 bank code + 19 account number
  // Extract bank code (positions 4-6 after IR prefix, or 0-2 if no prefix)
  let bankCode: string;
  
  if (cleanIban.startsWith('IR')) {
    // IBAN with IR prefix: IR00 010 ...
    bankCode = cleanIban.substring(4, 7);
  } else {
    // IBAN without IR prefix: 010...
    bankCode = cleanIban.substring(0, 3);
  }

  return BANK_CODES[bankCode] || '';
}

/**
 * Validates if the given IBAN is valid
 * @param iban - The IBAN number to validate
 * @returns true if valid, false otherwise
 */
export function isValidIban(iban: string): boolean {
  if (!iban) {
    return false;
  }

  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  
  // Check if it starts with IR and has correct length (26 characters total)
  if (cleanIban.startsWith('IR')) {
    return /^IR\d{24}$/.test(cleanIban);
  }
  
  // Without IR prefix, should be 24 digits
  return /^\d{24}$/.test(cleanIban);
}
