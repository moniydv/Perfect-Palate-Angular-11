import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  selectedIndex: number;
  editMode : boolean = false;
  recipe: Recipe;
  recipeIngredients = new FormArray([]);

  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(
      (params: Params ) => {
        this.selectedIndex = params['id'] - 1;
        if(this.selectedIndex >= 0) {
          this.editMode= true ;
          this.recipe = this.recipeService.getRecipe(this.selectedIndex);
          this.updateForm(this.recipe);
        }
    });

  }

  initForm() {
    this.recipeForm = new FormGroup(
      {
        'name' : new FormControl('', Validators.required),
        'imagepath': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'ingredients': this.recipeIngredients
      }
    );
  }

  updateForm(recipe: Recipe) {
    if(recipe.ingredients) {
      for(let ingredient of recipe.ingredients) {
        this.recipeIngredients.push(
          new FormGroup(
            {
              'name' : new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
        );
      }
    }

    this.recipeForm.patchValue({
      'name' : this.recipe.name,
      'imagepath' : this.recipe.imagepath,
      'description': this.recipe.description,
    });

    this.recipeForm.setControl('ingredients', this.recipeIngredients);
  }


  addIngredientRow() {
    this.recipeIngredients.insert(0,
      new FormGroup(
        {
          'name' : new FormControl(''),
          'amount': new FormControl('')
        })
    );
  }

  deleteIngredientRow(index: number) {
    this.recipeIngredients.removeAt(index);
  }

  getIngredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.selectedIndex, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.cancelForm();
  }

  cancelForm() {
    this.router.navigate(['../'], {relativeTo: this.route });
  }


}
