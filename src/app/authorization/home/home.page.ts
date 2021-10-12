import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage/storage.service';
import { HttpService } from '../../../services/httpCall/http.service';
import { CartService } from '../../../services/storage/cart.service';
import { ApiRouting } from '../../shared';
import { appConfig } from '../../utils'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  orderItems = 0;
  location: string = "home";
  setting = appConfig
  serviceList = [];
  constructor(
    private route: Router,
    private $cart: CartService,
    private $api: ApiRouting,
    private $http: HttpService,
    private $storageService: StorageService) { }

  ngOnInit() {
    this.getService();
    this.getCartItems();
    this.$storageService.address$.subscribe((result) => {
      if (result != null) {
        console.log(result);
      }
    })
  }

  getCartItems() {
    debugger
    this.$cart.apiData$.subscribe(res => {
      if (res != null) {
        debugger;
        let shopingCart = res;
        this.orderItems = shopingCart.items.length;
      }
    });
  }

  async getService() {
    const header = await this.$http.getHeaderToken();
    this.$http.httpCall(false).get(this.$api.goTo().serviceAvailableGetAll(), {}, header)
      .then((res: any) => {
        if (res.status == 200) {
          debugger
          this.serviceList = JSON.parse(res.data).response;
        }
      });
  }

  cart() {
    this.route.navigate(['./cart']);
  }

  stores(_id) {
    this.route.navigate(['./stores', { id: _id }]);
  }

  custom_delivery() {
    this.route.navigate(['./custom-delivery']);
  }

  clickAddress() {
    this.route.navigate(['./saved-addresses']);
  }


}
