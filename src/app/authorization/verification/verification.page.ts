import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared';
import { ACTION_TYPE } from 'src/app/utils/native-actions';
import { HttpService } from 'src/services/httpCall/http.service';
import { NativeDataService } from 'src/services/nativeData/native-data.service';
import { StorageService } from 'src/services/storage/storage.service';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  countDown: string;
  isResend = false;
  verificationOTP: string;
  getverificationOtp: any;
  expirationTime: any;
  constructor(
    private route: Router,
    private $http: HttpService,
    private $api: ApiRouting,
    private $toast: ToastService,
    private $nativeStorage: NativeDataService,
    private $storageService: StorageService) { }

  ngOnInit() {
    this.getverificationOtp = this.$storageService.getVerification();
    this.verificationOTP = this.getverificationOtp["otp"];
    this.expirationTime = this.getverificationOtp["otpExpirationTime"];
  }

  ionViewDidEnter() {
    this.intervalTimer();
  }
  set_location() {

    let payload = this.getverificationOtp;
    this.$http.httpCall().post(this.$api.goTo().loginUsingOtp(), payload, {}).then((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
        const tokenDetail = JSON.parse(res.data).response;

        this.$nativeStorage.setNative(ACTION_TYPE.REFRESH_TOKEN_KEY, tokenDetail.refreshToken);
        this.$nativeStorage.setNative(ACTION_TYPE.ACCESS_TOKEN, tokenDetail.accessToken).then(nativeRes => {
          // this.route.navigate(['./set-location']);

        });
      }
    }, (err) => {
      const toaster = {
        header: '',
        message: 'Invalid OTP',
        position: 'top'
      };
      this.$toast.show(toaster);
    })

  }


  resendOTP() {

    let payload = {
      phoneNumber: this.getverificationOtp['phoneNumber']
    }
    this.$http.httpCall().post(this.$api.goTo().resndOtp(), payload, {}).then((res: any) => {
      let data = JSON.parse(res.data);
      console.log(data['response']);
      this.verificationOTP = data['response'].otp;
      this.expirationTime = data['response'].otpExpirationTime;
      this.$storageService.setVerification(data['response']);
      this.intervalTimer();
    })

  }
  intervalTimer() {
    let min = new Date(this.expirationTime).getMinutes()
    let timer = 60 * min;
    let minutes: any;
    let seconds: any
    var x = setInterval(() => {
      minutes = parseInt((timer / 60).toString(), 10);
      seconds = parseInt((timer % 60).toString(), 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.countDown = minutes + ":" + seconds;
      this.isResend = false;

      if (--timer < 0) {
        this.isResend = true;
        clearInterval(x);

      }
    }, 1000);
  }
}
