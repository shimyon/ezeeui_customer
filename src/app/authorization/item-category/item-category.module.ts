import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ItemCategoryRoutingModule } from './item-category-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemCategoryComponent } from './item-category.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [ItemCategoryComponent],
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    ItemCategoryRoutingModule
  ]
})
export class ItemCategoryModule { }
