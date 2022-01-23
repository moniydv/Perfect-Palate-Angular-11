import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient} from  '../../shared/ingredient.model';
import { ShoppingService } from "../shopping.service";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') submitForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  selectedIndex : number ;
  editedIngredient : Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.editModeStarted.subscribe(
      (index: number) => {
        this.editMode = true;
        this.selectedIndex = index;
        this.editedIngredient = this.shoppingService.loadIngredient(index);
        this.submitForm.setValue({
          name : this.editedIngredient.name,
          amount : this.editedIngredient.amount
        });
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addIngredient() {
    const name = this.submitForm.value.name;
    const amount = this.submitForm.value.amount;
    const ingredient = new Ingredient(name, amount);
    if(this.editMode) {
      this.shoppingService.updateIngredient(ingredient, this.selectedIndex);
    }else{
      this.shoppingService.addIngredient(ingredient);
    }

    this.resetForm();

  }

  deleteIngredient() {
    if(this.editMode) {
      console.log('delete');
      this.shoppingService.deleteIngredient(this.selectedIndex);
    }

    this.resetForm();
  }

  resetForm() {
    this.submitForm.reset();
    this.editMode = false;
    this.selectedIndex = null;
    this.editedIngredient = null;
  }

}
