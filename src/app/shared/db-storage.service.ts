import { tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Recipe } from '../recipe_book/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DbStorageService {

  constructor(private http: HttpClient) { }

  saveRecipesDataToDB(data: Recipe[]) {
    this.http.put('https://angular-project-753f9-default-rtdb.firebaseio.com/recipes.json', data).subscribe(
      response => {
        console.log('saved data successfully !!');
      }
    )
  }

  fetchRecipesDataFromDB() : Promise<any> {
    return this.http.get<Recipe[]>('https://angular-project-753f9-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      })
    ).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
