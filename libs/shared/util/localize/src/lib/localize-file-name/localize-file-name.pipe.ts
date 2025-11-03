import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizeFileName',
  standalone: true,
})
export class LocalizeFileNamePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  transform(filename: string): unknown {
    return filename.replace(
      filename.substring(filename.lastIndexOf('.')),
      `.${this.localeId}${filename.substring(filename.lastIndexOf('.'))}`
    );
  }
}
