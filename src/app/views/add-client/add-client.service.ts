import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { ConstsUrlService } from '../../services/consts-url/consts-url.service';

@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  constructor( private constsUrlService: ConstsUrlService, private http: HttpClient ){}

  registerUser( user ){
      return this.http.post(this.constsUrlService.urlAuth(this.constsUrlService.paths.registerUser), user).pipe(take(1));
  }

  authenticateUser( user ){
    return this.http.post(this.constsUrlService.urlAuth(this.constsUrlService.paths.authenticateUser), user).pipe(take(1));
  }
}