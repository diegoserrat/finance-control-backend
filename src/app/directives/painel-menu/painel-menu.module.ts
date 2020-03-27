import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxCurrencyModule } from "ngx-currency";

import { PainelMenuComponent } from './painel-menu.component';
import { CreditCardService } from '../../views/credit-card/credit-card.service';
import { JwtInterceptor } from '../../helpers/jwt.interceptor';
import { DateService } from 'src/app/services/date-service/date-service.service';

@NgModule({
    declarations: [ PainelMenuComponent ],

    exports: [ PainelMenuComponent ],

    imports: [ CommonModule,
               ModalModule.forRoot(),
               FormsModule, 
               ReactiveFormsModule,
               NgxCurrencyModule],
               
    providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                 CreditCardService,
                 DateService ]
})

export class PainelMenuModule{

}