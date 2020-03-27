import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstsUrlService {

  constructor() {}

  public BASE_URL = 'http://localhost:5000';


  public paths = {
    registerUser: '/register',
    authenticateUser: '/authenticate',
    forgotPassword: '/forgot_password',
    creditCard: '/creditCard',
    payments: '/payments'
  };

  public urlBase( path: string){
     return this.BASE_URL + path;
  }

  public urlAuth( path: string){
    return this.BASE_URL + '/auth' + path;
  }
}
