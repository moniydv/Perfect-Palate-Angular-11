import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component(
  {
    selector : 'app-recipe-book' ,
    templateUrl: './recipe-book.component.html'
  }
)

export class RecipeBookComponent implements OnInit {
  recipes: Recipe[] = [];
  index: number;
  recipeSelected: Recipe;

  constructor(private recipeService: RecipeService,
    private router: Router , private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeBookUpdated.subscribe(
      (recipeList: Recipe[] ) => {
        this.recipes = recipeList;
      }
    )
  }

  onNewRecipeClick() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
