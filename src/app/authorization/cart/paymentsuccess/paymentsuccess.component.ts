import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss'],
})
export class PaymentsuccessComponent implements OnInit {
  data: any = {};
  constructor(
    private navCtrl: NavController,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let paydata = this.activeRoute.snapshot.paramMap.get('data');
    this.data = JSON.parse(paydata);
  }

  orderplaced() {
    this.navCtrl.navigateRoot(['./order-placed'], { replaceUrl: true });
  }
}
