import { DropdownDirective } from './../shared/dropdown.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeBookComponent }  from './recipe-book.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

const recipeRoutes : Routes = [
  {path: 'recipes', component: RecipeBookComponent, children: [
    {path: '', component: RecipeStartComponent },
    {path: 'new', component: RecipeEditComponent },
    {path: ':id', component: RecipeDetailComponent },
    {path: ':id/edit', component: RecipeEditComponent }
  ]}
];

@NgModule({
  declarations: [
    DropdownDirective,
    RecipeBookComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(recipeRoutes)
  ],
  exports:[
    RouterModule,
    RecipeBookComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ]
})
export class RecipeModule { }
