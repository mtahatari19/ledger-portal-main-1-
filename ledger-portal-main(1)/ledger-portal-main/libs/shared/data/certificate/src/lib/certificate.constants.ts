// Certificate Status Translations
export const certificateStatusTranslations: Record<string, string> = {
  ISSUING: 'در حال صدور',
  ISSUED: 'صادر شده',
  ACTIVE: 'فعال',
  DISCOUNTED: 'تنزیل‌شده',
  CANCELLED: 'لغو شده',
  SETTLED: 'تسویه‌شده',
  SUBMITTED_TO_MARKET: 'ارسال‌شده به بازار',
  PENDING: 'در انتظار',
  APPROVED: 'تایید شده',
  REJECTED: 'رد شده',
  PARTIALLY_SETTLED: 'تسویه جزئی',
  EXPIRED: 'منقضی شده',
  TRANSFERRED: 'منتقل شده',
  PENDING_APPROVAL: 'در انتظار تایید',
  PENDING_CANCELLATION: 'در انتظار ابطال',
  PARTIALLY_CANCELLED: 'ابطال جزئی',
  REFUNDED: 'بازپرداخت شده',
};

// Market Submission Status Translations
export const marketSubmissionStatusTranslations: Record<string, string> = {
  DRAFT: 'پیش‌نویس',
  FINALIZED: 'نهایی‌شده',
};

// Cancellation Status Translations
export const cancellationStatusTranslations: Record<string, string> = {
  DRAFT: 'پیش‌نویس',
  FINALIZED: 'نهایی‌شده',
};

// Cancellation Role Translations
export const cancellationRoleTranslations: Record<string, string> = {
  BENEFICIARY: 'ذی‌نفع',
  GUARANTOR: 'ضامن',
};

// Settlement Status Translations
export const settlementStatusTranslations: Record<string, string> = {
  DRAFT: 'پیش‌نویس',
  PENDING_APPROVAL: 'در انتظار تأیید',
  FINALIZED: 'نهایی‌شده',
  SETTLED: 'تسویه‌شده',
  SETTLED_BY_BANK: 'تسویه‌شده توسط بانک',
  FAILED: 'ناموفق',
  CANCELLED: 'لغو شده',
};

// Settlement Method Translations
export const settlementMethodTranslations: Record<string, string> = {
  SATNA: 'ساتنا',
  PAYA: 'پایا',
  DEPOSIT: 'واریز نقدی',
  INTERNAL_TRANSFER: 'انتقال داخلی',
  BANK_GUARANTEE: 'ضمانت‌نامه بانکی',
  SEPORDEH: 'برداشت از سپرده بانک',
};

// Applicant Document Type Translations
export const applicantDocumentTypeTranslations: Record<string, string> = {
  INVOICE: 'فاکتور',
  BILL: 'صورتحساب',
  STATEMENT: 'صورت‌وضعیت',
  RECEIPT: 'رسید',
};

// Product Value Type Translations
export const productValueTypeTranslations: Record<string, string> = {
  FIXED: 'ثابت',
  VARIABLE: 'متغیر',
};

// Committed Person Type Translations
export const committedPersonTypeTranslations: Record<string, string> = {
  REAL_IRANIAN: 'حقیقی ایرانی',
  REAL_FOREIGNER: 'حقیقی خارجی',
  LEGAL_IRANIAN: 'حقوقی ایرانی',
  LEGAL_FORIENER: 'حقوقی خارجی',
  DUAL: 'دو تابعیتی',
  UNDEFINE: 'نامشخص',
};

// Discount Status Translations
export const discountStatusTranslations: Record<string, string> = {
  DISCOUNTED: 'تنزیل‌شده',
  PENDING: 'در انتظار',
  COMPLETED: 'تکمیل شده',
  PARTIAL: 'جزئی',
};

// Symbol Type Translations
export const symbolTypeTranslations: Record<string, string> = {
  BOURSE: 'بورس',
  CBI: 'بانک مرکزی',
  OTC: 'فرابورس',
  PRIVATE: 'خصوصی',
  PUBLIC: 'عمومی',
};

// Transfer Status Translations
export const transferStatusTranslations: Record<string, string> = {
  SUCCESS: 'موفق',
  FAILED: 'ناموفق',
  PENDING: 'در انتظار',
  CANCELLED: 'لغو شده',
};

// Document Type Translations
export const documentTypeTranslations: Record<string, string> = {
  INVOICE: 'فاکتور',
  OTHER: 'سایر',
  RECEIPT: 'رسید',
  CONTRACT: 'قرارداد',
  AGREEMENT: 'توافقنامه',
  SUBMITTED_TO_MARKET: 'ارسال به بورس'
};

// Person Category Translations
export const personCategoryTranslations: Record<string, string> = {
  BANK_CUSTOMER: 'مشتری بانکی',
  NON_BANK_CUSTOMER: 'مشتری غیربانکی',
};

// Accounting Status Translations
export const accountingStatusTranslations: Record<string, string> = {
  POSTED: 'ثبت شده',
  PENDING: 'در انتظار',
  DRAFT: 'پیش‌نویس',
  VOID: 'باطل شده',
  REVERSED: 'برگشت خورده',
};

