import { Injectable } from '@angular/core';
import { DecodedToken } from '../models';
import {jwtDecode} from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid JWT Token:', error);
      return null;
    }
  }
}

