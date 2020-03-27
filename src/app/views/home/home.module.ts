import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { ChartsModule } from 'ng2-charts';


import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { JwtInterceptor } from '../../helpers/jwt.interceptor';
import { PainelMenuModule } from 'src/app/directives/painel-menu/painel-menu.module';
import { HomeService } from './home.service';
import { DateService } from '../../services/date-service/date-service.service';

@NgModule({
    declarations: [HomeComponent],

    imports: [  HttpClientModule, 
                CommonModule, 
                RouterModule,  
                HomeRoutingModule,
                PainelMenuModule,
                FormsModule,
                BlockUIModule.forRoot(),
                ChartsModule
            ],

    providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                 HomeService,
                 DateService
                ],
    
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class HomeModule{}