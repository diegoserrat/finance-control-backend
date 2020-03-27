import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CreditCardComponent } from './credit-card.component';
import { CreditCardRoutingModule } from './credit-card.routing.module';
import { JwtInterceptor } from '../../helpers/jwt.interceptor';
import { PainelMenuModule } from 'src/app/directives/painel-menu/painel-menu.module';
import { CreditCardService } from './credit-card.service';
import { DateService } from '../../services/date-service/date-service.service';

import { GenerateMonthsService } from './generate-months.service';

@NgModule({
    declarations: [CreditCardComponent],

    imports: [  HttpClientModule, 
                CommonModule, 
                RouterModule,  
                CreditCardRoutingModule,
                PainelMenuModule,
                FormsModule,
                BlockUIModule.forRoot(),
                ModalModule.forRoot()
            ],

    providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                 CreditCardService,
                 DateService,
                 GenerateMonthsService
                ],
    
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class CreditCardModule{}