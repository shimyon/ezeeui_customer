import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { HttpService } from '../../../services/httpCall/http.service';
import { CartService } from '../../../services/storage/cart.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ApiRouting } from '../../shared';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  orders: any = [];
  constructor(
    private route: Router,
    private modalController: ModalController,
    private $cart: CartService,
    private $api: ApiRouting,
    private $http: HttpService,
    private $storageService: StorageService,
    private platform: Platform) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    debugger
    this.GetllOrders();
  }

  order_detail(orderId) {
    this.route.navigate(['./order-detail', {
      data: JSON.stringify({
        id: orderId
      })
    }]);
  }
  add_review() {
    this.route.navigate(['./add-review']);
  }


  GetllOrders() {
    return new Promise(async (resolve, reject) => {
      try {
        const header = await this.$http.getHeaderToken();
        this.$http.httpCall(false).get(this.$api.goTo().OrderGetAll(), {}, header)
          .then((res: any) => {
            debugger
            if (res.status == 200) {
              this.orders = JSON.parse(res.data).response;
              resolve(this.orders);
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
}
