# Persian Translation Guide for Certificate Status Codes

## Overview
This guide explains how certificate status codes, symbol types, and other API response codes are translated from English to Persian in the application.

## Translation Files

### 1. Certificate Constants (`libs/shared/data/certificate/src/lib/certificate.constants.ts`)
Contains all translation mappings for certificate-related codes.

#### Certificate Status Translations
| English Code | Persian Translation |
|-------------|-------------------|
| ISSUED | صادر شده |
| SUBMITTED_TO_MARKET | ارسال شده به بازار |
| PENDING | در انتظار |
| APPROVED | تایید شده |
| REJECTED | رد شده |
| CANCELLED | ابطال شده |
| SETTLED | تسویه شده |
| PARTIALLY_SETTLED | تسویه جزئی |
| EXPIRED | منقضی شده |
| TRANSFERRED | منتقل شده |
| PENDING_APPROVAL | در انتظار تایید |
| PENDING_CANCELLATION | در انتظار ابطال |
| PARTIALLY_CANCELLED | ابطال جزئی |
| REFUNDED | بازپرداخت شده |

#### Symbol Type Translations
| English Code | Persian Translation |
|-------------|-------------------|
| BOURSE | بورس |
| OTC | فرابورس |
| PRIVATE | خصوصی |
| PUBLIC | عمومی |

#### Accounting Status Translations
| English Code | Persian Translation |
|-------------|-------------------|
| POSTED | ثبت شده |
| PENDING | در انتظار |
| DRAFT | پیش‌نویس |
| VOID | باطل شده |
| REVERSED | برگشت خورده |

#### Document Type Translations
| English Code | Persian Translation |
|-------------|-------------------|
| INVOICE | فاکتور |
| RECEIPT | رسید |
| CONTRACT | قرارداد |
| AGREEMENT | توافقنامه |
| OTHER | سایر |

#### Transfer Status Translations
| English Code | Persian Translation |
|-------------|-------------------|
| SUCCESS | موفق |
| FAILED | ناموفق |
| PENDING | در انتظار |
| CANCELLED | لغو شده |

## Translation Pipes

### 2. Certificate Translation Pipes (`libs/shared/data/certificate/src/lib/certificate-translate.pipe.ts`)
Angular pipes for easy translation in templates.

#### Available Pipes:
- `certificateStatus` - Translates certificate status codes
- `symbolType` - Translates symbol type codes
- `accountingStatus` - Translates accounting status codes
- `documentType` - Translates document type codes
- `transferStatus` - Translates transfer status codes

## Usage Examples

### In Component Templates

#### Example 1: Translating Certificate Status
```html
<!-- Before -->
<span>{{ certificate.status.code }}</span>
<!-- Output: SUBMITTED_TO_MARKET -->

<!-- After -->
<span>{{ certificate.status.code | certificateStatus }}</span>
<!-- Output: ارسال شده به بازار -->
```

#### Example 2: Translating Symbol Type
```html
<!-- Before -->
<span>{{ certificate.symbolType }}</span>
<!-- Output: BOURSE -->

<!-- After -->
<span>{{ certificate.symbolType | symbolType }}</span>
<!-- Output: بورس -->
```

#### Example 3: Full Certificate Details
```html
<div class="certificate-details">
  <div>
    <span>کد اوراق:</span>
    <span>{{ certificate.code }}</span>
  </div>
  <div>
    <span>نماد بورسی:</span>
    <span>{{ certificate.symbolName }}</span>
  </div>
  <div>
    <span>نوع نماد:</span>
    <span>{{ certificate.symbolType | symbolType }}</span>
  </div>
  <div>
    <span>وضعیت:</span>
    <span>{{ certificate.status.code | certificateStatus }}</span>
  </div>
</div>
```

### In Components (TypeScript)

#### Importing the Pipes
```typescript
import { 
  CertificateStatusPipe, 
  SymbolTypePipe,
  AccountingStatusPipe 
} from '@gam/shared/data/certificate';

@Component({
  selector: 'app-my-component',
  imports: [
    CommonModule,
    CertificateStatusPipe,
    SymbolTypePipe,
    // ... other imports
  ],
  // ...
})
export class MyComponent {
  // Component logic
}
```

## API Response Example

### Sample API Response (from your data)
```json
{
  "certificateId": 64,
  "code": "ledger-portal-2025-444166",
  "status": {
    "code": "SUBMITTED_TO_MARKET",
    "statusDate": "2025-10-06"
  },
  "symbolType": "BOURSE",
  "symbolName": "1123"
}
```

### How It Displays in the UI
- **Status Code**: `SUBMITTED_TO_MARKET` → **ارسال شده به بازار**
- **Symbol Type**: `BOURSE` → **بورس**
- **Symbol Name**: `1123` → **1123** (unchanged, as it's a custom name)

## Components Updated

The following components have been updated to use the translation pipes:

1. **Send to Exchange** (`libs/back-office/feature/send-to-exchange/`)
   - Displays translated status and symbol types in the security selection form
   - Shows translated status in confirmation and success views

2. **Discounting** (`libs/back-office/feature/discounting/`)
   - Shows translated certificate status in the selected certificate details

## Adding New Translations

To add a new status or type translation:

1. Open `libs/shared/data/certificate/src/lib/certificate.constants.ts`
2. Add the new code-translation pair to the appropriate object:

```typescript
export const certificateStatusTranslations: Record<string, string> = {
  // ... existing translations
  NEW_STATUS_CODE: 'ترجمه فارسی',
};
```

3. The pipe will automatically use the new translation
4. If the code is not found in the translations, the original code will be displayed

## Fallback Behavior

All pipes have fallback behavior:
- If a code is not found in the translation map, the original English code is displayed
- If the value is `null` or `undefined`, an empty string is returned

## Notes

- All translations use Persian/Farsi characters
- The pipes are standalone and can be imported individually
- No need to modify existing templates if codes are already being displayed - just add the appropriate pipe
- The translation constants can be imported separately if you need to use them in TypeScript code


