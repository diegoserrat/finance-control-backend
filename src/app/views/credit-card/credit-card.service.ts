import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, first } from 'rxjs/operators';

import { creditCard } from '../../models/creditCard';
import { ConstsUrlService } from '../../services/consts-url/consts-url.service';

@Injectable()

export class CreditCardService {

  constructor( private http: HttpClient,
               private service: ConstsUrlService){}

  getCreditCard(id){
      return this.http.get<creditCard[]>(this.service.urlBase(this.service.paths.creditCard)+`/?user=${id}`);
  }

  addCreditCard(creditCard){
      return this.http.post(this.service.urlBase(this.service.paths.creditCard), creditCard).pipe(take(1));
  }

  addPayment(payment){
      return this.http.post(this.service.urlBase(this.service.paths.payments), payment).pipe(take(1));
  }s

  putCreditCard(id, creditCard){
      return this.http.put(this.service.urlBase(this.service.paths.creditCard)+`/${id}`, creditCard).pipe(take(1));
  }

  deleteCreditCard(id){
      return this.http.delete(this.service.urlBase(this.service.paths.creditCard)+`/${id}`).pipe(take(1));
  }

  deletePayment(id){
      return this.http.delete(this.service.urlBase(this.service.paths.payments)+`/${id}`).pipe(take(1));
  }
}
