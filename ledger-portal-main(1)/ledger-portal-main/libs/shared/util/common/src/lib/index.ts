import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject } from '@angular/core';

import moment from 'jalali-moment';
import { map, Observable } from 'rxjs';
import { SSE, SSEOptions, SSEvent } from 'sse.js';

import { LocalStorageService } from '@ledger-portal/shared/util/local-storage';
import { ENVIRONMENT } from '@ledger-portal/shared/util/web-sdk';

interface ParamsObject {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: string | number | boolean | null | undefined | any;
}

export function isHandsetScreen() {
  return inject(BreakpointObserver)
    .observe(Breakpoints.Handset)
    .pipe(map(value => value.matches));
}

export function getTwoFactorMethod() {
  return inject(LocalStorageService).getItem('twoFactorMethod') ?? '';
}

export function removeUndefinedProperties(obj: ParamsObject) {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as ParamsObject);
}

export function readFileAsDataUrl(blob: Blob): Observable<string | ArrayBuffer | null> {
  return new Observable(obs => {
    if (!(blob instanceof Blob)) {
      obs.error(new Error('`blob` must be an instance of File or Blob.'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = err => obs.error(err);
    reader.onabort = err => obs.error(err);
    reader.onload = () => obs.next(reader.result);
    reader.onloadend = () => obs.complete();

    return reader.readAsDataURL(blob);
  });
}

export function formatUnixTimestampToLocalISO(unixTimestamp: number, iso8601 = false) {
  if (unixTimestamp) {
    const now = new Date(unixTimestamp); // Convert Unix timestamp to milliseconds
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    return iso8601 ? isoString + 'Z' : isoString;
  }
  return null;
}
export function formatUnixTimestampToUTCISO(unixTimestamp: number, iso8601 = true): string | null {
  if (unixTimestamp) {
    const now = new Date(unixTimestamp);
    const year = now.getUTCFullYear().toString().padStart(4, '0');
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = now.getUTCDate().toString().padStart(2, '0');
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = now.getUTCMilliseconds().toString().padStart(3, '0');

    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    return iso8601 ? isoString + 'Z' : isoString;
  }
  return null;
}

export function hexToRGBA(hex: string, alpha?: number): string {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    return hex;
  }

  // convert the hex color string to an array of numbers
  const colors = hex
    .slice(1)
    .match(/.{1,2}/g)!
    .map(c => parseInt(c, 16));
  // add the alpha value if provided, otherwise use 1
  colors.push(alpha ?? 1);
  return `rgba(${colors.join(',')})`;
}

// TODO: Maybe move this to a separate library
export function fromEventSource(url: string, options?: SSEOptions): Observable<SSEvent> {
  return new Observable<SSEvent>(subscriber => {
    const sse = new SSE(url, options);

    sse.onmessage = e => subscriber.next(e);
    sse.onerror = e => subscriber.error(e);
    sse.onreadystatechange = () => {
      if (sse.readyState === 2) {
        setTimeout(() => subscriber.complete());
      }
    };

    return () => {
      if (sse.readyState === 1) {
        sse.close();
      }
    };
  });
}

export function generateIbanFromAccountNumber(id: string) {
  // if accountNumber is '12345', the resulting `accountNumber` will be '000000012345'.
  const accountNumber = id.padStart(13, '0');

  // Country code and bank code
  const countryCode = 'IR';
  const bankCode = '0170';

  // if `bankCode` is '123' and `accountNumber` is '456789', the resulting `bban` will be '123000000000456789'
  const bban = bankCode + accountNumber.padStart(18, '0');

  // if `bban` is '123000000000456789', `countryCode` is 'DE', the resulting `rearrangedIBAN` will be '123000000000456789DE00'.
  const rearrangedIBAN = bban + countryCode + '00';

  // Converts `rearrangedIBAN` to a numeric
  const numericIBAN = rearrangedIBAN.replace(/[A-Z]/g, char => (char.charCodeAt(0) - 55).toString());
  const remainder = BigInt(numericIBAN) % 97n;
  const checkDigits = (98n - remainder).toString().padStart(2, '0');
  const iban = countryCode + checkDigits + bban;
  return iban;
}

export function isAndroidEnvironment() {
  return typeof Android !== 'undefined';
}
export function isIosEnvironment() {
  return typeof Ios !== 'undefined';
}

export function shouldUseCompactVersion() {
  const compactVersionDays = ['01', '02', '03', '27', '28', '29', '30', '31'];
  const dayOfMonth = moment(new Date()).locale('fa').format('DD');
  return inject(ENVIRONMENT).compactVersion && compactVersionDays.includes(dayOfMonth);
}

export async function createSHAHashFromString(key: string, encoding = 'hex', length = null) {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  let hash;
  if (encoding === 'hex') {
    hash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  } else if (encoding === 'base64') {
    hash = btoa(String.fromCharCode(...hashArray));
  } else {
    throw new Error("Invalid encoding. Use 'hex' or 'base64'.");
  }

  return length ? hash.substring(0, length) : hash;
}

export function blobToText(blob: Blob) {
  return new Observable<string>(observer => {
    const reader = new FileReader();

    reader.onload = () => {
      observer.next(reader.result as string);
      observer.complete();
    };

    reader.onerror = error => {
      observer.error(error);
    };

    reader.readAsText(blob);
  });
}
