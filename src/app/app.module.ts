import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RecipeModule } from './recipe_book/recipe.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppingBagComponent } from './shopping/shopping-bag/shopping-bag.component';
import { ShoppingEditComponent } from './shopping/shopping-edit/shopping-edit.component';

import { DropdownDirective } from './shared/dropdown.directive';

import { ShoppingService } from './shopping/shopping.service';
import { RecipeService } from './recipe_book/recipe.service';

import { ErrorComponent } from './error/error.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ShoppingComponent,
    ShoppingBagComponent,
    ShoppingEditComponent,
    ErrorComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipeModule,

    AppRoutingModule  //called it in last to support ** route
  ],
  providers: [ShoppingService, RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
