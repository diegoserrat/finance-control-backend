import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, first } from 'rxjs/operators';

import { ConstsUrlService } from '../../services/consts-url/consts-url.service';

@Injectable()

export class HomeService {

  constructor( private http: HttpClient,
               private service: ConstsUrlService){}

}
