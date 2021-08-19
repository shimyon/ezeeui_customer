import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiRouting } from 'src/app/shared';
import { appConfig } from 'src/app/utils';
import { HttpService } from 'src/services/httpCall/http.service';
import { Location } from "@angular/common";


@Component({
  selector: 'app-saved-addresses',
  templateUrl: './saved-addresses.page.html',
  styleUrls: ['./saved-addresses.page.scss'],
})
export class SavedAddressesPage implements OnInit {
  openFrom;
  defaultAddress;
  deliveryLocation = []
  appData = appConfig;
  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private $http: HttpService, private $api: ApiRouting, private route: Router) { }

  ngOnInit() {
    debugger
    this.openFrom = this.activeRoute.snapshot.paramMap.get('openFrom');
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

  getImageData(value) {
    return this.appData.setImageAddress.filter(a => a.value === value).length ? this.appData.setImageAddress.filter(a => a.value === value)[0].image : null;
  }

  selectedAddress = async (addressInfo) => {
    const header = await this.$http.getHeaderToken();
    const payload = {
      userid: addressInfo.userId,
      customerAddressId: addressInfo.id
    }
    this.$http.httpCall(false).post(this.$api.goTo().setDefaultAddress(), payload, header)
      .then((res: any) => {
        if (res.status == 200) {
          addressInfo.isDefaultAddress = true;
          this.Continue();
        }
      });
  }

  Continue() {
    if (this.openFrom) {
      if (this.openFrom == 'cart') {
        this.navCtrl.navigateForward(['./cart']);
      }
    } else {
      this.navCtrl.navigateRoot(['./tabs']);
    }
  }

  add() {
    this.route.navigate(['./set-location', { openFrom: this.openFrom }]);
  }
}
