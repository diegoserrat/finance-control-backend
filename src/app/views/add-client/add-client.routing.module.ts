import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddClientComponent } from './add-client.component';

const clientRoutes: Routes  = [ 
    { path: '', component:  AddClientComponent, data:{ preload: true} }, 
];

@NgModule({
    imports: [RouterModule.forChild(clientRoutes)],
    exports: [RouterModule]
})

export class AddClientRoutingModule{};