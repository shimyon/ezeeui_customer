"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerificationPage = void 0;
var core_1 = require("@angular/core");
var native_actions_1 = require("src/app/utils/native-actions");
var VerificationPage = /** @class */ (function () {
    function VerificationPage(route, $http, $api, $toast, $nativeStorage, $storageService) {
        this.route = route;
        this.$http = $http;
        this.$api = $api;
        this.$toast = $toast;
        this.$nativeStorage = $nativeStorage;
        this.$storageService = $storageService;
        this.isResend = false;
    }
    VerificationPage.prototype.ngOnInit = function () {
        this.getverificationOtp = this.$storageService.getVerification();
        this.verificationOTP = this.getverificationOtp["otp"];
        this.expirationTime = this.getverificationOtp["otpExpirationTime"];
    };
    VerificationPage.prototype.ionViewDidEnter = function () {
        this.intervalTimer();
    };
    VerificationPage.prototype.set_location = function () {
        var _this = this;
        var payload = this.getverificationOtp;
        this.$http.httpCall().post(this.$api.goTo().loginUsingOtp(), payload, {}).then(function (res) {
            if (res.status === 200) {
                console.log(res.response);
                var tokenDetail = JSON.parse(res.data).response;
                _this.$nativeStorage.setNative(native_actions_1.ACTION_TYPE.REFRESH_TOKEN_KEY, tokenDetail.refreshToken);
                _this.$nativeStorage.setNative(native_actions_1.ACTION_TYPE.ACCESS_TOKEN, tokenDetail.accessToken).then(function (nativeRes) {
                    _this.route.navigate(['./set-location']);
                });
            }
        }, function (err) {
            var toaster = {
                header: '',
                message: 'Invalid OTP',
                position: 'top'
            };
            _this.$toast.show(toaster);
        });
    };
    VerificationPage.prototype.resendOTP = function () {
        var _this = this;
        var payload = {
            phoneNumber: this.getverificationOtp['phoneNumber']
        };
        this.$http.httpCall().post(this.$api.goTo().resndOtp(), payload, {}).then(function (res) {
            var data = JSON.parse(res.data);
            console.log(data['response']);
            _this.verificationOTP = data['response'].otp;
            _this.expirationTime = data['response'].otpExpirationTime;
            _this.$storageService.setVerification(data['response']);
            _this.intervalTimer();
        });
    };
    VerificationPage.prototype.intervalTimer = function () {
        var _this = this;
        var min = new Date(this.expirationTime).getMinutes();
        var timer = 60 * min;
        var minutes;
        var seconds;
        var x = setInterval(function () {
            minutes = parseInt((timer / 60).toString(), 10);
            seconds = parseInt((timer % 60).toString(), 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            _this.countDown = minutes + ":" + seconds;
            _this.isResend = false;
            if (--timer < 0) {
                _this.isResend = true;
                clearInterval(x);
            }
        }, 1000);
    };
    VerificationPage = __decorate([
        core_1.Component({
            selector: 'app-verification',
            templateUrl: './verification.page.html',
            styleUrls: ['./verification.page.scss']
        })
    ], VerificationPage);
    return VerificationPage;
}());
exports.VerificationPage = VerificationPage;
