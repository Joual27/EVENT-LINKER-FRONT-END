import { inject, Injectable } from '@angular/core';
import { DecodedToken } from '../models';
import {jwtDecode} from 'jwt-decode'
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  private encryptionService = inject(EncryptionService);

  constructor() { }

  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid JWT Token:', error);
      return null;
    }
  }


  updateToken(token : string): void {
    let user = this.encryptionService.getLoggedInUser();
    if(user){
       user.token = token;
       this.encryptionService.setLoggedInUser(user);
    }
  }
}
