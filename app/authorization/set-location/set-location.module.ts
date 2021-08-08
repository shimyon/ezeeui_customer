import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SetLocationPageRoutingModule } from './set-location-routing.module';

import { SetLocationPage } from './set-location.page';
import {MapComponent} from './map/map.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TranslateModule,    
    SetLocationPageRoutingModule,
    SharedModule
  ],
  declarations: [SetLocationPage,MapComponent]
})
export class SetLocationPageModule {}
