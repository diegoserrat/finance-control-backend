import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// to ngx-charts fix animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RoutingModule } from './app.routingModule';

import { LoginModule } from './views/login/login.module';
import { HomeModule } from './views/home/home.module';
import { AddClientModule } from './views/add-client/add-client.module';

import { ConstsUrlService } from './services/consts-url/consts-url.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, 
    RoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    HomeModule,
    AddClientModule,
    BrowserAnimationsModule
  ],
  providers: [ ConstsUrlService ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }