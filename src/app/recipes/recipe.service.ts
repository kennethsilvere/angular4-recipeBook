import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Biryani',
      'Indian chicken & rice delicacy',
      'https://upload.wikimedia.org/wikipedia/commons/f/f6/Chicken_Biryani_and_Nargisi_Kofta_with_Raita.jpg',
      [
        new Ingredient('Chicken', '1 lb'),
        new Ingredient('Rice', '1')
      ]),
    new Recipe('Deep dish pizza',
      'What else you need to say?',
      'https://c1.staticflickr.com/3/2459/3787472415_59d8a9b7ca_b.jpg',
      [
        new Ingredient('Pizza Base', '1'),
        new Ingredient('Marinara Sauce', '1 Can'),
        new Ingredient('Cheese', 'A lot !')
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
