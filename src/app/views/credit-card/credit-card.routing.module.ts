import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreditCardComponent } from './credit-card.component';

const clientRoutes: Routes  = [ 
    { path: '', component:  CreditCardComponent, data:{ preload: true} }, 
];

@NgModule({
    imports: [RouterModule.forChild(clientRoutes)],
    exports: [RouterModule]
})

export class CreditCardRoutingModule{};