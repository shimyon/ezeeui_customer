import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VariationSelectionPage } from '../variation-selection/variation-selection.page';
import { CartService } from '../../../services/storage/cart.service'
import { Capacitor, Plugins, registerWebPlugin } from "@capacitor/core";
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../services/httpCall/http.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ApiRouting } from '../../shared';
const { AllInOneSDK } = Plugins;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  shopingCart: any = {
    items: []
  };
  paymentInfo: any;
  orderId: any;
  callbackUrl: any;
  txnAmount: any;
  constructor(
    private route: Router,
    private modalController: ModalController,
    private $cart: CartService,
    private $api: ApiRouting,
    private $http: HttpService,
    private $storageService: StorageService
  ) { }

  ngOnInit() {
    debugger
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('AllInOneSDK');
    if (isPushNotificationsAvailable) {

    }
    debugger
    this.$cart.apiData$.subscribe(res => {
      if (res != null) {
        debugger;
        this.shopingCart = res;
        this.paymentInfo = this.shopingCart['shopingCartSummary'];
      }
    });

    console.log(this.shopingCart)
  }


  // saved_addresses() {
  //    this.route.navigate(['./saved-addresses']);
  //  }  
  payment() {
    debugger
    this.StartTransaction();
    // this.route.navigate(['./payment']);
  }

  variation_selection() {
    this.modalController.create({ component: VariationSelectionPage }).then((modalElement) => {
      modalElement.present();
    })
  }

  async StartTransaction() {
    const header = await this.$http.getHeaderToken();
    this.$http.httpCall(false).get(this.$api.goTo().OrderTransaction(this.paymentInfo.sellingPriceTotal), {}, header)
      .then((res: any) => {
        debugger
        if (res.status == 200) {
          let response = JSON.parse(res.data).response;
          this.orderId = response.body.orderId;
          this.callbackUrl = response.body.orderId;
          this.txnAmount = response.body.txnAmount;
        }
      });
  }

  async startTransaction() {
    let response = await AllInOneSDK.startTransaction({
      mid: environment.paytm.MerchantID,
      amount: this.txnAmount,
      orderId: this.orderId,
      callbackUrl: this.callbackUrl,
      txnToken: 'txnToken',
      isStaging: !environment.production,
      restrictAppInvoke: true
    });
  }
}
