import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments.example';
import * as CryptoJS from 'crypto-js';
import { UserData } from '../../../shared/models';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey = environments.localStorageSecretKey;
  private readonly storageKey = 'signedInUser';

  setLoggedInUser(user: UserData): void {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
    localStorage.setItem(this.storageKey, ciphertext);
  }

  getLoggedInUser(): UserData | null {
    const ciphertext = localStorage.getItem(this.storageKey);
    if (!ciphertext) {
      return null;
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }

  removeLoggedInUser(): void {
    localStorage.removeItem(this.storageKey);
  }
  constructor() { }
}
