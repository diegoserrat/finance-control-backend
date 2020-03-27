import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';


const appRoutes: Routes  = [ 
    
    { path: '', loadChildren: () => import('./views/login/login.module').then( m => m.LoginModule)},
    { path: 'home', loadChildren: () => import('./views/home/home.module').then( m => m.HomeModule), canActivate: [AuthGuard]},
    { path: 'addClient', loadChildren: () => import('./views/add-client/add-client.module').then( m => m.AddClientModule)},
    { path: 'creditCard', loadChildren: () => import('./views/credit-card/credit-card.module').then( m => m.CreditCardModule)},
    { path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class RoutingModule{};