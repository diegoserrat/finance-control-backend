import { NgModule,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxViacepModule } from '@brunoc/ngx-viacep'; 

import { AddClientComponent } from './add-client.component';
import { AddClientRoutingModule } from './add-client.routing.module';

@NgModule({
    declarations: [ AddClientComponent ],

    imports: [
                HttpClientModule, 
                CommonModule, 
                RouterModule,  
                FormsModule, 
                ReactiveFormsModule,
                AddClientRoutingModule,
                NgxViacepModule],
    
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class AddClientModule{}