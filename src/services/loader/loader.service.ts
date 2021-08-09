import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private loadingController: LoadingController
  ) { }

  dismiss(){
    this.loadingController.dismiss();
  }

  async show() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Please wait...',
      translucent: true,
    });
    return await loading.present();
  }

}
