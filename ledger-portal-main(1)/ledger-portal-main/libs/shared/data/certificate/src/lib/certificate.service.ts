import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { CertificateResponse } from './certificate.model';

@Injectable({
  providedIn: 'root',
})
export class CertificateApprovalService {
  private httpClient = inject(HttpClient);
  baseUrl = 'http://146.59.83.245:8075';

  fetchCertificate() {
    return this.httpClient.get<CertificateResponse>(
      `${this.baseUrl}/rest/gam/certificates?page=0&size=20&sort=createdAt%2Cdesc`
    );
  }
}
