import { Pipe, PipeTransform } from '@angular/core';
import {
  certificateStatusTranslations,
  marketSubmissionStatusTranslations,
  cancellationStatusTranslations,
  cancellationRoleTranslations,
  settlementStatusTranslations,
  settlementMethodTranslations,
  applicantDocumentTypeTranslations,
  productValueTypeTranslations,
  committedPersonTypeTranslations,
  discountStatusTranslations,
  symbolTypeTranslations,
  transferStatusTranslations,
  documentTypeTranslations,
  personCategoryTranslations,
  accountingStatusTranslations,
} from './certificate.constants';

@Pipe({
  name: 'certificateStatus',
  standalone: true,
})
export class CertificateStatusPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return certificateStatusTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'marketSubmissionStatus',
  standalone: true,
})
export class MarketSubmissionStatusPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return marketSubmissionStatusTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'cancellationStatus',
  standalone: true,
})
export class CancellationStatusPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return cancellationStatusTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'cancellationRole',
  standalone: true,
})
export class CancellationRolePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return cancellationRoleTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'settlementStatus',
  standalone: true,
})
export class SettlementStatusPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return settlementStatusTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'settlementMethod',
  standalone: true,
})
export class SettlementMethodPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return settlementMethodTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'applicantDocumentType',
  standalone: true,
})
export class ApplicantDocumentTypePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return applicantDocumentTypeTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'productValueType',
  standalone: true,
})
export class ProductValueTypePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return productValueTypeTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'committedPersonType',
  standalone: true,
})
export class CommittedPersonTypePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return committedPersonTypeTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'discountStatus',
  standalone: true,
})
export class DiscountStatusPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return discountStatusTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'symbolType',
  standalone: true,
})
export class SymbolTypePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return symbolTypeTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'transferStatus',
  standalone: true,
})
export class TransferStatusPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return transferStatusTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'documentType',
  standalone: true,
})
export class DocumentTypePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return documentTypeTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'personCategory',
  standalone: true,
})
export class PersonCategoryPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return personCategoryTranslations[value] ?? value;
  }
}

@Pipe({
  name: 'accountingStatus',
  standalone: true,
})
export class AccountingStatusPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return accountingStatusTranslations[value] ?? value;
  }
}

