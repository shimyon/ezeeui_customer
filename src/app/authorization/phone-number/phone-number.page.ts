import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiRouting } from 'src/app/shared';
import { ACTION_TYPE } from 'src/app/utils/native-actions';
import { HttpService } from 'src/services/httpCall/http.service';
import { NativeDataService } from 'src/services/nativeData/native-data.service';
import { StorageService } from 'src/services/storage/storage.service';
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.page.html',
  styleUrls: ['./phone-number.page.scss'],
})
export class PhoneNumberPage implements OnInit {
  phoneNumber = "";
  constructor(
    private _storageService: StorageService,
    private route: Router,
    private navCtrl: NavController,
    private $http: HttpService,
    private $nativeStorage: NativeDataService,
    private $api: ApiRouting,
  ) { }

  ngOnInit() {
    if (localStorage.getItem("phoneNumber")) {
      this.phoneNumber = localStorage.getItem("phoneNumber");
    }

  }
  verification() {
    this.route.navigate(['./verification']);
  }


  login() {
    const payload = {
      phoneNumber: this.phoneNumber,
      otp: "",
      otpExpirationTime: ''
    };

    this.$http.httpCall().post(this.$api.goTo().customerLoginUser(), payload, {})
      .then(data => {
        const res: any = data;
        if (res.status === 200) {
          localStorage.setItem("phoneNumber", this.phoneNumber);
          data = JSON.parse(res.data);
          payload.otp = data['response'].otp;
          payload.otpExpirationTime = data['response'].otpExpirationTime;
          this._storageService.setVerification(payload);
          this.verification();
          // }else{
          //   this.$nativeStorage.setNative(ACTION_TYPE.ACCESS_TOKEN, res.data).then(res=>{
          //     this.navCtrl.navigateRoot(['./tabs']);
          //     this.getSetAddress();
          //   },(error)=>{
          //     console.log(error)
          //   });


        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getSetAddress = async () => {
    const header = await this.$http.getHeaderToken();
    this.$http.httpCall(true).get(this.$api.goTo().getCustomerAddress(), {}, header)
      .then((res: any) => {
        if (res.status == 200) {
          const addressInfo = JSON.parse(res.data);
          this._storageService.setAddress(addressInfo);
        }
      });
  }


  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
