import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  private editItemSubscription: Subscription;
  editingItemIndex: number;
  editMode = false;
  editingItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.editItemSubscription = this.slService.editingItems.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editingItemIndex = index;
        this.editingItem = this.slService.getIngredient(index);
        this.slForm.setValue({
            name: this.editingItem.name,
            amount: this.editingItem.amount
          });
      }
    );
  }

  onAddItem(f: NgForm) {
    var form = f.value;
    const newIngredient = new Ingredient(form.name, form.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editingItemIndex, newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.slForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editingItemIndex);
    this.slForm.reset();
    this.editMode=false;
  }


  ngOnDestroy(){
    this.editItemSubscription.unsubscribe();
  }
}
