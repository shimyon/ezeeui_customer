import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
@Input() total:any;
  constructor(  private route: Router) { }

  ngOnInit() {}
  cart() {
    
    this.route.navigate(['./cart']);
  }
}
