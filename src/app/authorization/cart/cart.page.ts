import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { VariationSelectionPage } from '../variation-selection/variation-selection.page';
import { CartService } from '../../../services/storage/cart.service'
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
  PaymentId: any = 0;
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
    await this.SetDeliveryAddress();
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

  SetDeliveryAddress() {
    return new Promise(async (resolve, reject) => {
      try {
        debugger;
        const header = await this.$http.getHeaderToken();
        this.$http.httpCall(false).post(this.$api.goTo().SetDeliveryAddress(), {
          customerAddressId: this.defaultAddress.id
        }, header)
          .then((res: any) => {
            if (res.status == 200) {
              resolve(res);
            } else {
              reject(res);
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  OrderAddNew() {
    return new Promise(async (resolve, reject) => {
      try {
        const header = await this.$http.getHeaderToken();
        this.$http.httpCall(false).post(this.$api.goTo().OrderAddNew(),
          {
            "note": "string",
            "paymentId": this.PaymentId
          }, header)
          .then((res: any) => {
            if (res.status == 200) {
              let response = JSON.parse(res.data).response;
              resolve(response);
            } else {
              reject(res);
            }
          }).catch(e => {
            debugger
            reject(e);
          });;
      } catch (e) {
        reject(e);
      }
    });
  }

  OrderPaymentAddNew(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        const header = await this.$http.getHeaderToken();
        this.$http.httpCall(false).post(this.$api.goTo().OrderPaymentAddNew(),
          {
            "orderId": obj.ORDERID,
            "bankName": obj.BANKNAME,
            "txnAmount": parseFloat(obj.TXNAMOUNT),
            "txnDate": new Date(obj.TXNDATE),
            "mid": obj.MID,
            "respCode": obj.RESPCODE,
            "paymentMode": obj.PAYMENTMODE,
            "txnID": obj.TXNID,
            "bankTxnID": obj.BANKTXNID,
            "currency": obj.CURRENCY,
            "gatewayName": obj.GATEWAYNAME,
            "respMsg": obj.RESPMSG,
            "checkSumHash": obj.CHECKSUMHASH
          }, header)
          .then((res: any) => {
            debugger
            if (res.status == 200) {
              let response = JSON.parse(res.data).response;
              this.PaymentId = response;
              resolve(res);
            } else {
              reject(res);
            }
          }).catch(e => {
            debugger
            reject(e);
          });
      } catch (e) {
        reject(e);
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
    }).then(async resp => {
      let response = JSON.parse(resp.response);
      if (response.STATUS == "TXN_SUCCESS") {
        debugger
        await this.OrderPaymentAddNew(response);
        await this.OrderAddNew();
        this.route.navigate(['./cart/paymentsuccess', { data: resp.response }], { replaceUrl: true });
      } else {
        alert("Trasaction Failed!");
      }
    }, error => {
      debugger
      alert(error);
    });
  }
}
