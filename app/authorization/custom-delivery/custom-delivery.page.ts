import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PackageTypePage } from '../package-type/package-type.page';

@Component({
  selector: 'app-custom-delivery',
  templateUrl: './custom-delivery.page.html',
  styleUrls: ['./custom-delivery.page.scss'],
})
export class CustomDeliveryPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  package_type(){
    this.modalController.create({component:PackageTypePage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  } 
}
