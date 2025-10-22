export function isValidAccountNumber(accountNumber: string | number): boolean {
  if (!accountNumber) {
    return false;
  }

  const accountStr = accountNumber.toString().trim();
  
  // Account numbers are typically 13-16 digits
  if (!/^\d{13,16}$/.test(accountStr)) {
    return false;
  }

  // Add additional validation logic here if needed
  return true;
}
