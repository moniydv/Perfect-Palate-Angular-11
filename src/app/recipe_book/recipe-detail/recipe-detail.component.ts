import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
//import { ShoppingService } from "../../shopping/shopping.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

  @ViewChild('ingredientCheckboxes') checkedIngredients: ElementRef;
  recipe: Recipe;
  id: number;
  ingredients:Ingredient[] = [];

  //constructor(private shoppingService: ShoppingService) { }
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'] - 1;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  addIngredientsToShoppingList() {
    //this.shoppingService.addIngredients(this.recipe.ingredients);
    this.recipeService.updateShoppingList(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
