import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { AllInOneSDK } from '@ionic-native/all-in-one-sdk/ngx';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CartPageRoutingModule
  ],
  providers: [AllInOneSDK],
  declarations: [CartPage, PaymentsuccessComponent]
})
export class CartPageModule { }
