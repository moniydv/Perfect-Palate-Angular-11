import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient} from  '../shared/ingredient.model';
import { ShoppingService } from "./shopping.service";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  subscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getShoppingList();
    this.subscription = this.shoppingService.shoppingListChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppingService.onEditIngredient(index);
  }
}
