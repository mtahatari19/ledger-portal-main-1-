import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask',
  standalone: true,
})
export class MaskPipe implements PipeTransform {
  transform(value: string | number | null | undefined, startIndex: number, endIndex: number, char = '*') {
    const valueString = value?.toString();

    return !valueString
      ? value
      : '\u200E' + valueString.replace(valueString.substring(startIndex, endIndex), char.repeat(endIndex - startIndex));
  }
}
