import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { VariationSelectionPage } from '../variation-selection/variation-selection.page';
import { CartService } from '../../../services/storage/cart.service'
import { Capacitor, Plugins, registerWebPlugin } from "@capacitor/core";
import { environment } from '../../../environments/environment';
import { HttpService } from '../../../services/httpCall/http.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ApiRouting } from '../../shared';
// const { AllInOneSDK } = Plugins;
import { AllInOneSDK } from '@ionic-native/all-in-one-sdk/ngx';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  defaultAddress;
  deliveryLocation = [];
  shopingCart: any = {
    items: []
  };
  paymentInfo: any;
  orderId: any;
  txnAmount: any;
  txnToken: any;
  constructor(
    private Paytm: AllInOneSDK,
    private route: Router,
    private modalController: ModalController,
    private $cart: CartService,
    private $api: ApiRouting,
    private $http: HttpService,
    private $storageService: StorageService,
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.$cart.apiData$.subscribe(res => {
      if (res != null) {
        debugger;
        this.shopingCart = res;
        this.paymentInfo = this.shopingCart['shopingCartSummary'];
      }
    });
    this.getSetAddress();
  }

  getSetAddress = async () => {
    const header = await this.$http.getHeaderToken();
    this.$http.httpCall(true).get(this.$api.goTo().getCustomerAddress(), {}, header)
      .then((res: any) => {
        if (res.status == 200) {
          this.deliveryLocation = JSON.parse(res.data).response;
          this.defaultAddress = this.deliveryLocation.find(f => f.isDefaultAddress);
        }
      });
  }

  OpenAddress() {
    this.route.navigate(['./saved-addresses', { openFrom: 'cart' }]);
  }

  payment() {
    this.StartTransaction();
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
          this.txnAmount = response.body.transAmount;
          this.txnToken = response.body.txnToken;
          this.readyForPay();
        }
      });
  }

  async readyForPay() {
    this.Paytm.startTransaction({
      mid: environment.paytm.MerchantID,
      amount: this.txnAmount,
      orderId: this.orderId,
      callbackUrl: `${environment.paytm.callbackurl + '' + this.orderId}`,
      txnToken: this.txnToken,
      isStaging: !environment.production,
      restrictAppInvoke: true
    }).then(res => {
      debugger
    }, err => {
      debugger
    });
  }
}
