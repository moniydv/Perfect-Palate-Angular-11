import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingComponent } from './shopping/shopping.component';
import { ErrorComponent } from './error/error.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes : Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'shopping', component: ShoppingComponent},
  {path: 'login', component: AuthComponent},
  {path: 'signup', component: AuthComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})


export class AppRoutingModule { }
