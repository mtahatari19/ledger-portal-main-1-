import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private storage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: Record<string, unknown>) {
    this.storage = isPlatformBrowser(this.platformId) ? localStorage : new LocalStorage();
  }

  [name: string]: unknown;

  length = 0;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}

class LocalStorage implements Storage {
  [name: string]: unknown;

  readonly length = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clear(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItem(key: string): string | null {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  key(index: number): string | null {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeItem(key: string): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setItem(key: string, value: string): void {}
}
