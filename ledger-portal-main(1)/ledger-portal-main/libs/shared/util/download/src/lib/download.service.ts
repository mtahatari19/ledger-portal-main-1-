import { HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  document = inject(DOCUMENT);
  breakpointObserver = inject(BreakpointObserver);

  downloadFile(response: HttpResponse<Blob>, fileName?: string) {
    if (!response.body) {
      return;
    }

    if (!fileName) {
      const contentDisposition = response.headers.get('content-disposition');
      fileName = contentDisposition?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)?.[1];

      if (!fileName) {
        throw new Error(
          'Either pass a file name or the response should contain the content-disposition with filename in header'
        );
      }
    }

    const a = document.createElement('a');
    const objectURL = window.URL.createObjectURL(response.body);

    a.setAttribute('href', objectURL);
    a.setAttribute('download', fileName);
    a.setAttribute('target', '_blank');
    a.click();

    window.URL.revokeObjectURL(objectURL);
  }

  shareOrDownload = (file: File) => {
    if (
      this.breakpointObserver.isMatched(Breakpoints.Handset) &&
      this.document.defaultView?.navigator.canShare &&
      this.document.defaultView?.navigator.canShare({ files: [file] })
    ) {
      this.share(file);
    } else {
      this.download(file);
    }
  };

  download(file: File) {
    if (!this.document.defaultView) {
      return;
    }

    const a = document.createElement('a');
    const objectURL = this.document.defaultView.window.URL.createObjectURL(file);
    a.setAttribute('href', objectURL);
    a.setAttribute('download', file.name);
    a.click();

    this.document.defaultView.URL.revokeObjectURL(objectURL);
  }

  share(file: File) {
    this.document.defaultView?.navigator
      .share({
        files: [file],
      })
      .catch(error => console.log('Error sharing', error));
  }
}
