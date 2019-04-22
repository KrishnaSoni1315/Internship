import { Injectable } from '@angular/core';

@Injectable()

export class AuthServiceService {

  constructor() { }
  
  isAuthorized(allowedRoles: string[]): boolean {
  
    if (allowedRoles == null || allowedRoles.length === 0) {
      
      return true;
    }
  
   var token = localStorage.getItem('access_token');
   var role = localStorage.getItem('role');  
  
    if (!token) {
      console.log('Invalid token');
      return false;
    }
  
  console.log(role);
  return allowedRoles.includes(role);
  
  }
}


