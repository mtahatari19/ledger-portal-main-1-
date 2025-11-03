export function isMelliAccountNumber(account: string) {
  if (account.length > 13 || account.length < 11 || isNaN(Number(account))) {
    return false;
  }

  const accountString = account.slice(0, 12);
  const checkDigit = account[account.length - 1];

  let firstValue = 5 * Number(accountString[11]);
  let secondValue = 5 * Number(accountString[10]);
  let checkDig = firstValue + secondValue;

  firstValue = 13 * Number(accountString[9]);
  secondValue = 17 * Number(accountString[8]);
  checkDig += firstValue + secondValue;

  firstValue = 19 * Number(accountString[7]);
  secondValue = 23 * Number(accountString[6]);
  checkDig += firstValue + secondValue;

  firstValue = 29 * Number(accountString[5]);
  secondValue = 31 * Number(accountString[4]);
  checkDig += firstValue + secondValue;

  firstValue = 37 * Number(accountString[3]);
  secondValue = 41 * Number(accountString[2]);
  checkDig += firstValue + secondValue;

  firstValue = 43 * Number(accountString[1]);
  secondValue = 47 * Number(accountString[0]);
  checkDig += firstValue + secondValue;
  checkDig = checkDig % 11;

  if (checkDig === 1) {
    return false;
  }

  checkDig = 11 - checkDig;

  if (checkDig === 11) {
    checkDig = 0;
  }

  return checkDig === Number(checkDigit);
}
