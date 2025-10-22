import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileNumber',
  standalone: true,
})
export class MobileNumberPipe implements PipeTransform {
  //This pipe is for normalizing mobile numbers.
  //Input: 989994443333
  //Output: 09994443333

  transform(value: string | number | null | undefined) {
    const mobileNumber = value!.toString();

    if (mobileNumber.length === 12 && mobileNumber.startsWith('9')) {
      return '0' + mobileNumber.slice(2);
    }

    return mobileNumber;
  }
}
