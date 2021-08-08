import { Injectable } from '@angular/core';
// import { CustomUISDK } from '@ionic-native/custom-uisdk/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AllInOneSDK } from '@ionic-native/all-in-one-sdk/ngx'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class PytemService {


  constructor(private allInOneSDK: AllInOneSDK, private http: HTTP) { }
 
  moneyTransferByPaytem = () => {
    this.http.setDataSerializer('json');
  
    return {
   
  
        //var verifyChecksum = PaytmChecksum.verifySignature(this.paytmParams, this.paytemConfig.Key, result);
        //console.log("verifySignature Returns: " + verifyChecksum);
        //  this.paytmParams["head"]={
        //    "signiture":paytmChecksum
        //  }
      //   this.$http.post(`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${this.paytemConfig.MerchantID}&orderId=ORDERID_98765`, this.paytmParams, null).then(res => {
      //     console.log('test', res)
          
      //   })
      // }).catch(function (error) {
      //   console.log(error);
      // });
  
      post: (url, payload, headers) => {
        console.log(' ====== PAYLOAD ====== ', payload);
        return new Promise((resolve, reject) => {
          this.http.post(url, payload, headers).then(res => {
            this.allInOneSDK.startTransaction(payload).then(
              resp => {
                // The response received after the transaction is completed will be an object containing "message" and "response". You can parse both and use them as required in your application
                console.log(resp.response)
              }).catch(error => {
                console.log("error", error)
              })
            resolve(res);
          }).catch(err => {
            
            reject(err);
          });
        });
      },
    
    };
  }
  
  
  // deviceAppExistOrNot() {
  //   return this.customUI.isPaytmAppInstalled();
  // }

  // getPaytemTokenId(clientId) {
  //   const mid = this.paytemConfig.MerchantID;
  //   return this.customUI.fetchAuthCode(clientId, mid);
  // }

  // moneyTransferByPaytem() {
  //   const mid = this.paytemConfig.MerchantID;
  //   this.customUI.initPaytmSDK(mid, '1233244', '2225', '100', true, null);
  // }


    

    // const mid = this.paytemConfig.MerchantID;
    // const paymentIntent = {
    //   mid: mid,
    //   orderId: "ORDERID_98765",
    //   txnToken: "2225",
    //   amount: "10",
    //   isStaging: true,
    //   callbackUrl: `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=ORDERID_98765`,
    //   restrictAppInvoke: true
    // };


    // this.$http.post(`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${mid}&orderId=ORDERID_98765`, paymentIntent, null).then(res => {
    //   console.log('test', res)
    //   this.allInOneSDK.startTransaction(paymentIntent).then(
    //     resp => {
    //       // The response received after the transaction is completed will be an object containing "message" and "response". You can parse both and use them as required in your application
    //       console.log(resp.response)
    //     }).catch(error => {
    //       console.log("error", error)
    //     })
    // })

    // await AllInOneSDKPlugin.startTransaction(paymentIntent);
  
}
