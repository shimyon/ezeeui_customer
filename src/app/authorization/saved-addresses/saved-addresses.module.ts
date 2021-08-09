import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
   
import { IonicModule } from '@ionic/angular';

import { SavedAddressesPageRoutingModule } from './saved-addresses-routing.module';

import { SavedAddressesPage } from './saved-addresses.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,   
    SavedAddressesPageRoutingModule,
    SharedModule
  ],
  declarations: [SavedAddressesPage]
})
export class SavedAddressesPageModule {}
