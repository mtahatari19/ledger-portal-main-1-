export function convertNonEnglishDigitsToEnglish(text: string | null | undefined): string{
  return text
    ? text
        .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
        .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
    : '';
}
