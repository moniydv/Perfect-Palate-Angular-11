import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from "../shopping/shopping.service";

@Injectable()

export class RecipeService {
  recipeBookUpdated = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe('Couscous Salad',
      'This side salad is full of fresh and crunchy vegetables!',
      'https://www.spendwithpennies.com/wp-content/uploads/2020/04/Couscous-Salad-SpendWithPennies-1.jpg',
      [
        new Ingredient('couscous', 3),
        new Ingredient('butter', 1),
        new Ingredient('water cups', 3),
        new Ingredient('tomatoes', 5),
        new Ingredient('cucumber', 2) ,
        new Ingredient('bell pepper', 1 ),
        new Ingredient('red onion', 1),
        new Ingredient('feta cheese', 1 ),
        new Ingredient('flat leaf parsley', 1)
      ]
    ),
    new Recipe('Ground Chicken Burger',
      'This ground chicken burger is juicy, moist, and flavorful! No more dry chicken, and you can have this burger on the table in half an hour.',
      'https://feelgoodfoodie.net/wp-content/uploads/2020/06/Chicken-Burgers-6.jpg',
      [])
  ];

  constructor(private shoppingService: ShoppingService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeBookUpdated.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeBookUpdated.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipeBookUpdated.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeBookUpdated.next(this.recipes.slice());
  }

  updateShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }
}
