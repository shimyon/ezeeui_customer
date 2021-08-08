import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VariationSelectionPage } from '../variation-selection/variation-selection.page';
import { CartService } from '../../../services/storage/cart.service'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  shopingCart: any = {
    items: []
  };
  paymentInfo: any;
  constructor(private route: Router, private modalController: ModalController, private $cart: CartService) { }

  ngOnInit() {
    debugger
    this.$cart.apiData$.subscribe(res => {
      if (res != null) {
        debugger;
        this.shopingCart = res;
        this.paymentInfo = this.shopingCart['shopingCartSummary'];
      }
    });

    console.log(this.shopingCart)
  }


  // saved_addresses() {
  //    this.route.navigate(['./saved-addresses']);
  //  }  
  payment() {
    this.route.navigate(['./payment']);
  }
  variation_selection() {
    this.modalController.create({ component: VariationSelectionPage }).then((modalElement) => {
      modalElement.present();
    }
    )
  }
}
