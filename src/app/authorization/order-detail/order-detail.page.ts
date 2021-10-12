import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { HttpService } from '../../../services/httpCall/http.service';
import { ApiRouting } from '../../shared';
import { ChatPage } from '../chat/chat.page';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  data: any = {};

  fabAction = false;
  constructor(
    private $api: ApiRouting,
    private $http: HttpService,
    private navCtrl: NavController,
    private activeRoute: ActivatedRoute,
    private route: Router, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let paydata = this.activeRoute.snapshot.paramMap.get('data');
    this.data = JSON.parse(paydata);
    debugger
  }

  GetOrderDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        const header = await this.$http.getHeaderToken();
        this.$http.httpCall(false).get(this.$api.goTo().OrderGetById(this.data.id),
          {}, header)
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


  toggleFab() {
    this.fabAction = !this.fabAction;
  }

  chat() {
    this.modalController.create({ component: ChatPage }).then((modalElement) => {
      modalElement.present();
    }
    )
  }
}
