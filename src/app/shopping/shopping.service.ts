import { Subject } from 'rxjs';
import { Ingredient} from  '../shared/ingredient.model';

export class ShoppingService {

  private ingredients: Ingredient[] = [
    new Ingredient('Potatoes',5),
    new Ingredient('Onions',3)
  ];
  shoppingListChanged = new Subject<Ingredient[]>();
  editModeStarted = new Subject<number>();

  getShoppingList(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.shoppingListChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  //  this.shoppingListChanged.emit(this.ingredients.slice()); //no need of this as component is recreating again
  }

  onEditIngredient(index: number) {
    this.editModeStarted.next(index);
  }

  loadIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
    this.shoppingListChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index,1);
    this.shoppingListChanged.next(this.ingredients.slice());
  }
}
