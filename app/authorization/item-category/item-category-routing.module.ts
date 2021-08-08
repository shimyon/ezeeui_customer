import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemCategoryComponent } from './item-category.component';


const routes: Routes = [
  {
    path: '',
    component: ItemCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemCategoryRoutingModule { }
