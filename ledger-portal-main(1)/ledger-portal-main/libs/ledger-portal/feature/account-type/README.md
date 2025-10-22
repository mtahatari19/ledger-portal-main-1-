# Account Type Feature

This feature module implements a comprehensive 4-step wizard form for defining and managing account types in the General Ledger (GL) system.

## Overview

The Account Type component allows users to:
- Define general account type information
- Configure allowed currencies
- Set up organizational units
- Establish limitations and controls

## UI/UX Document Reference

- **Document Code**: GL_UI_UX_AccountType_v01
- **Subsystem**: General Ledger (GL)
- **Purpose**: Define and manage account types that form the basis for account opening, document issuance, and transaction recording in the system

## Component Structure

### AccountTypeComponent

Location: `libs/ledger-portal/feature/account-type/src/lib/account-type/`

#### Features

1. **4-Step Wizard Form** with custom progress bar navigation
2. **Mat-Progress-Bar** for visual step progress indication
3. **Reactive Forms** with comprehensive validation
4. **RTL Layout** with Persian language support
5. **Primary Color**: #0A74DA (Fara organization blue)
6. **Tailwind CSS** for styling
7. **Custom Step Indicators** with icons and clickable navigation

## Form Steps

### Step 1: General Information (اطلاعات عمومی)

**Fields:**
- Account Type Code (کد نوع حساب) - Required, Numeric
- Accounting Code 1 (کد حسابداری ۱) - Optional
- Accounting Code 2 (کد حسابداری ۲) - Optional
- Persian Name (نام فارسی) - Required
- English Name (نام انگلیسی) - Optional
- Account Group (گروه حساب) - Required, Dropdown
- Subsystem (زیرسیستم) - Required, Dropdown
- Product Type (نوع محصول) - Optional, Dropdown
- Relation Type (رابطه حسابداری) - Optional, Dropdown
- Party Type (نوع شخص) - Optional, Dropdown
- Sub-account Type (تعیین زیرحساب) - Optional, Dropdown
- Status (وضعیت) - Active/Inactive Toggle
- Description (توضیحات) - Optional, Text Area

### Step 2: Allowed Currencies (ارزهای مجاز)

**Fields:**
- Currency Type (نوع ارز) - Radio Button
  - Fixed Currency (ارز ثابت): Single currency selection
  - Multiple Currencies (ارزهای مجاز): Multiple currency selection
- Currency Selection (انتخاب ارزها) - Required, Material Chip Listbox
- Default Currency (ارز پیش‌فرض) - Required for multiple currencies

**Business Rules:**
- If currency type is "Fixed", only one currency can be selected (single-select chips)
- If currency type is "Multiple", user can select multiple currencies (multi-select chips)
- Selected chips are highlighted with primary color (#0A74DA)
- Automatic reset when changing currency type
- Chips show: Currency Name (Currency Code)

### Step 3: Allowed Organizational Units (واحدهای سازمانی مجاز)

**Fields:**
- Organization Type (نوع انتخاب) - Radio Button
  - Fixed Unit (واحد سازمانی ثابت): Single unit selection
  - Multiple Units (واحدهای مجاز): Multiple unit selection
- Unit Selection (انتخاب واحدها) - Required, Material Chip Listbox
- Default Unit (واحد پیش‌فرض) - Required for multiple units

**Business Rules:**
- Similar to currency selection logic
- If org type is "Fixed", only one unit can be selected (single-select chips)
- If org type is "Multiple", user can select multiple units (multi-select chips)
- Selected chips are highlighted with primary color (#0A74DA)
- Automatic reset when changing organization type
- Chips show: Unit Name (Unit Code)

### Step 4: Limitations/Controls (محدودیت‌ها)

**Fields:**
- Limitation Type (نوع محدودیت) - Dropdown
  - Item (کالا)
  - Item Group (گروه کالا)
  - Transaction Code (کد تراکنش)
  - User Group (گروه کاربری)
- Relation Type (نوع رابطه) - Dropdown
  - Allowed (مجاز)
  - Not Allowed (غیرمجاز)
- Entity Selection (انتخاب موجودیت‌ها) - Multi-select
- Description (توضیحات) - Optional

**Features:**
- Add multiple limitations
- Display limitations as cards
- Delete individual limitations
- Empty state when no limitations defined

## Data Models

### Interfaces

```typescript
interface SelectOption {
  value: string;
  label: string;
}

interface Currency {
  id: string;
  code: string;
  nameFa: string;
  nameEn: string;
}

interface OrganizationalUnit {
  id: string;
  code: string;
  name: string;
}

interface Limitation {
  id: string;
  limitType: string;
  limitTypeName: string;
  relationType: string;
  relationTypeName: string;
  entities: LimitEntity[];
  description: string;
}
```

## Database Tables

- `GL_B_ACCOUNT_TYPE` - Main account type table
- `GL_B_ACCOUNT_GROUP` - Account groups
- `GL_B_SUBSYSTEM` - Subsystems
- `GL_B_PRODUCT_TYPE` - Product types
- `GL_B_RELATION_TYPE` - Relation types
- `GL_B_PARTY_TYPE` - Party types
- `GL_B_CURRENCY` - Currencies
- `GL_B_ORG_UNIT` - Organizational units
- `GL_B_LIMIT_ENTITY_TYPE` - Limitation entity types

## Sample Data

| Code | Persian Name | Account Group | Subsystem | Product Type | Relation | Default Currency | Status |
|------|-------------|---------------|-----------|--------------|----------|------------------|--------|
| 101  | حساب پرداختنی پذیرنده | بدهی | یارانه | کالا برگ | تعهد | ریال ایران | فعال |
| 102  | حساب اعتبار مشتری | دارایی | یارانه | طرح عادی | دریافتنی | ریال ایران | فعال |

## Routing

The module is configured with the following routes:

- `/console/account-type` → Redirects to `/console/account-type/add`
- `/console/account-type/add` → Add new account type
- `/console/account-type/edit/:id` → Edit existing account type

## Usage

### Navigation

Users can access the account type form through:
1. Basic Information dashboard card
2. Direct URL: `/console/account-type/add`

### Form Submission

When the user completes all steps and clicks "ذخیره نهایی" (Final Save):
1. Form validation is performed
2. Data is consolidated from all steps
3. Success toast message is displayed
4. User is redirected back to basic information page

### Form Output

The final form data structure:

```typescript
{
  // Step 1: General Information
  code: string,
  accountingCode1: string,
  accountingCode2: string,
  nameFa: string,
  nameEn: string,
  accountGroup: string,
  subsystem: string,
  productType: string,
  relationType: string,
  partyType: string,
  subAccountType: string,
  status: boolean,
  description: string,
  
  // Step 2: Currencies
  currencies: {
    type: 'fixed' | 'multiple',
    selected: Currency[],
    default: string
  },
  
  // Step 3: Organizational Units
  organizationalUnits: {
    type: 'fixed' | 'multiple',
    selected: OrganizationalUnit[],
    default: string
  },
  
  // Step 4: Limitations
  limitations: Limitation[]
}
```

## Testing

Run tests with:

```bash
nx test ledger-portal-feature-account-type
```

The component includes comprehensive unit tests for:
- Form initialization
- Validation logic
- Currency selection
- Organizational unit selection
- Limitation management

## Navigation & Progress Tracking

### Progress Bar System

The component uses a custom step navigation system with `mat-progress-bar`:

**Features:**
- Visual progress indicator showing completion percentage (25%, 50%, 75%, 100%)
- Step indicators with icons that change based on completion status
- Clickable step indicators for navigation to previous steps
- Current step counter (e.g., "مرحله 2 از 4")
- Step validation before allowing progression
- Automatic scroll to top on step change

**Step Icons:**
- Step 1: `info` (Information icon)
- Step 2: `attach_money` (Currency icon)
- Step 3: `business` (Business/Organization icon)
- Step 4: `rule` (Rules/Limitations icon)

**Icon States:**
- Completed steps: Show checkmark icon
- Current/Future steps: Show step icon
- Completed steps: Blue background (#0A74DA)
- Incomplete steps: Gray background

### Navigation Controls

**Previous Button:**
- Available from Step 2 onwards
- Always enabled (no validation required)
- Icon: Arrow pointing forward (RTL)

**Next Button:**
- Available from Step 1 to Step 3
- Validates current step before proceeding
- Shows validation errors if incomplete
- Icon: Arrow pointing backward (RTL)

**Final Save Button:**
- Available only on Step 4
- Validates all previous steps
- Shows success message on completion
- Redirects to basic information page

## Development Notes

### Technology Stack

- **Angular 18+** - Framework with modern control flow (@if, @for)
- **Angular Material** - UI Components (Progress Bar, Form Fields, Chips, etc.)
- **Tailwind CSS** - Styling
- **Reactive Forms** - Form management
- **RxJS** - Reactive programming

### Key Dependencies

- `@angular/material` - Material Design components
- `@angular/cdk` - Angular Component Dev Kit
- Tailwind CSS configuration

### Design Patterns

- Reactive Forms with FormBuilder
- Component-based architecture
- Standalone components
- Lazy-loaded routing
- TypeScript strict mode
- Custom step management with progress tracking
- Modern Angular control flow (@if, @for) instead of structural directives

### Modern Angular Features

**Control Flow Syntax (Angular 17+)**

This component uses the new built-in control flow syntax:

- **@if** instead of *ngIf - More readable conditional rendering
- **@for** instead of *ngFor - Built-in trackBy with improved performance
- **Better performance** - Optimized change detection
- **Improved DX** - Less verbose, more intuitive syntax

Example:
```html
<!-- Old way -->
<div *ngIf="currentStep === 1">
  <mat-option *ngFor="let item of items" [value]="item.id">
    {{ item.name }}
  </mat-option>
</div>

<!-- New way -->
@if (currentStep === 1) {
  @for (item of items; track item.id) {
    <mat-option [value]="item.id">
      {{ item.name }}
    </mat-option>
  }
}
```

## Future Enhancements

- [ ] API integration for loading dropdown data
- [ ] API integration for form submission
- [ ] Edit mode with pre-populated data
- [ ] List view with data table
- [ ] Search and filter functionality
- [ ] Export to Excel/PDF
- [ ] Audit trail tracking

## Support

For questions or issues, contact the development team or refer to the main project documentation.
