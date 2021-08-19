import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private loadingController: LoadingController
  ) { }

  dismiss() {
    // this.loadingController.dismiss();
    // Instead of directly closing the loader like below line
    // return await this.loadingController.dismiss();

    this.checkAndCloseLoader();

    // sometimes there's delay in finding the loader. so check if the loader is closed after one second. if not closed proceed to close again
    setTimeout(() => {
      this.checkAndCloseLoader()
    }, 2000);
  }

  async checkAndCloseLoader() {
    // Use getTop function to find the loader and dismiss only if loader is present.
    const loader = await this.loadingController.getTop();
    // if loader present then dismiss
    if (loader !== undefined) {
      await this.loadingController.dismiss();
    }
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
