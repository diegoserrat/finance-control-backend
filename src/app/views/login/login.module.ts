import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '../../views/login/login.component';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
    declarations: [LoginComponent],

    imports: [ CommonModule, 
               RouterModule,  
               FormsModule, 
               ReactiveFormsModule,
               LoginRoutingModule],

    providers: [],

    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class LoginModule{}