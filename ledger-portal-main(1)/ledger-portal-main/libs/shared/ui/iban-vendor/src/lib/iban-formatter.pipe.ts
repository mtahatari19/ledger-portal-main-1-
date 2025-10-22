import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ibanFormatter',
  standalone: true,
})
export class IbanFormatterPipe implements PipeTransform {
  transform(value: string, separator = ' '): unknown {
    if (!value.toUpperCase().startsWith('IR') || value.length < 26) {
      return value;
    }

    return value
      ?.split(/(.{4})/g)
      ?.filter(i => i)
      .join(separator);
  }
}
