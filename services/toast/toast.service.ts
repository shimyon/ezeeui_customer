import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toaster: ToastController
  ) { }

  async dismiss(){
    this.toaster.dismiss();
  }

  async show(config) {
    const toast = await this.toaster.create({
      header: config.header,
      message: config.message,
      position: config.position,
      buttons: config.buttons,
      duration: 2000
    });
    toast.present();
  }

}
