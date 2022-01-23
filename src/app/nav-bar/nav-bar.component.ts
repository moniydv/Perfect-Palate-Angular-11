import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { RecipeService } from './../recipe_book/recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { DbStorageService } from './../shared/db-storage.service';

@Component({
  selector: "app-nav-bar",
  templateUrl: "nav-bar.component.html",
  styleUrls:[
    "nav-bar.component.css"
  ]
})

export class NavBarComponent implements OnInit, OnDestroy{
  navbarOptions = [];
  collapsed = true;
  activeId = 'recipes';
  isLoggedIn = false;
  username : string;
  userSub: Subscription;

  constructor(private dbService: DbStorageService,
    private authservice: AuthService,
    private recipeService: RecipeService,
    private router: Router) {
    this.navbarOptions.push({ id: 'recipes' , name: 'Recipes'});
    this.navbarOptions.push({ id: 'shopping', name: 'Shopping'});
  }
  
  ngOnInit() {
    this.userSub = this.authservice.loggedInUser.subscribe(
      authResponse => {
        console.log(authResponse);
        if(authResponse && authResponse.token) {
          if(this.isLoggedIn == false) {
            this.fetchRecipesFromDB('current');
          }
          this.isLoggedIn = true;
          this.username = authResponse.email;
        }else{
          this.isLoggedIn = false;
          this.username = '';
        }
      }
    );
  }

  saveRecipesToDB() {
    const recipes = this.recipeService.getRecipes();
    this.dbService.saveRecipesDataToDB(recipes);
    this.router.navigate(['/recipes']);
  }

  fetchRecipesFromDB(navigation?: string) {
    const recipesPromise = this.dbService.fetchRecipesDataFromDB();
    recipesPromise.then(
      response => {
        console.log('fetched data successfully !!');
        this.recipeService.setRecipes(response);
        if(!(navigation && navigation == 'current')){
          this.router.navigate(['/recipes']);
        }
      },
      error => {
        console.log(error.error.error);    
      }
    )
  }

  onLoginClick() {
    this.router.navigate(['./login']);
  }
  
  onSignUpClick() {
    this.router.navigate(['./signup']);
  }

  onLogoutClick() {
    this.authservice.logout();
    this.router.navigate(['./login']);
  }
  
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
