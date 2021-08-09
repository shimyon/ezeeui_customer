import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ApiRouting, BackgroundUrlPipe,validationMessage } from '.';
import { PriceCalcPipe } from './pipe/price-calc.pipe';
import { ItemCategoryComponent } from '../shared/component/item-category/item-category.component';
import { ItemListComponent } from '../shared/component/item-list/item-list.component';
import { IonicModule } from '@ionic/angular';
import { appNumberOnly } from './directive/integer-number.directive';
import {CartItemComponent} from './index'
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    BackgroundUrlPipe,
    PriceCalcPipe,
    ItemCategoryComponent,
    ItemListComponent,
    CartItemComponent,
    appNumberOnly],
  imports: [
    IonicModule,
    CommonModule,
     FormsModule,
     ReactiveFormsModule,
     TranslateModule
  ],
  exports: [
    BackgroundUrlPipe,
    PriceCalcPipe,
    ItemCategoryComponent,
    ItemListComponent,
    CartItemComponent,
    appNumberOnly],
  providers: [ApiRouting,validationMessage]
})
export class SharedModule { }
