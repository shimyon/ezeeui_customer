import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { PytemService } from '../../../services/payment/pytem.service';
import { PaytmChecksum } from '../../utils/PaytmChecksum'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paytmParams = {};
  paytemConfig = environment.paytm;
  constructor(private navCtrl: NavController, private _paytm: PytemService) { }

  ngOnInit() {
  }
  pay() {
    this.navCtrl.navigateRoot(['./order-placed']);
  }

  async paytm() {
    //   this._paytm.getPaytemTokenId("001").then((res)=>{
    //  console.log(res)
    //   })
    let param= {};

    this.paytmParams["MID"] = this.paytemConfig.MerchantID;
    this.paytmParams['WEBSITE'] = 'WEBSTAGING';
    this.paytmParams['CHANNEL_ID'] = 'WEB';
    this.paytmParams['INDUSTRY_TYPE_ID'] = 'Retail';
    this.paytmParams['ORDER_ID'] = 'ORDER_001';
    this.paytmParams['CUST_ID'] = 'CUST0011';
    this.paytmParams['TXN_AMOUNT'] = '100';
    this.paytmParams['CALLBACK_URL'] = '/callback';
    this.paytmParams['EMAIL'] = 'anil@gmail.com';
    this.paytmParams['MOBILE_NO'] = '7845558956';

    await PaytmChecksum.generateSignature(this.paytmParams, this.paytemConfig.Key)
      .then(function (result) {
       
      param=   {
          body: {
              requestType: "Payment",
              mid: "LSaDij49380566394419",
              websiteName: "WEBSTAGING",
              orderId: 'ORDER_001',
              txnAmount: {
                  value: "1.00",
                  currency: "INR"
              },
              userInfo: {
                  custId: "CUST_001"
              },
              callbackUrl: "https://merchant.com/callback"
          },
          head: {
              signature: result
          }
      }
      });
      this._paytm.moneyTransferByPaytem().post(`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${this.paytemConfig.MerchantID}&orderId=ORDER_001`, param, null);
   
  }

}
