import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared';
import { HttpService } from 'src/services/httpCall/http.service';
import { StorageService } from '../../../services/storage/storage.service';
import { CartService } from '../../../services/storage/cart.service'
@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  tab: string = "vegetables";
  groupData: any;
  storeData: any;
  categoryInfo: any;
  itemData = [];
  constructor(
    private route: Router,
    private $storage: StorageService,
    private $http: HttpService,
    private $api: ApiRouting,
    private $cart: CartService) { }

  ngOnInit() {

    this.categoryInfo = this.$storage.getCategory();
    this.groupData = this.categoryInfo.group;
    this.storeData = this.categoryInfo.storedata;
    this.onCategoryClick(this.groupData[0].id);
  }

  reviews() {
    this.route.navigate(['./reviews']);
  }

  onCategoryClick = async (categoryId) => {
    const header = await this.$http.getHeaderToken();
    const payload = {
      storeId: this.storeData.id,
      groupId: categoryId.value != null ? parseInt(categoryId.value) : categoryId
    }
    this.$http.httpCall(true).post(this.$api.goTo().getStoreItemListing(), payload, header).then((res: any) => {
      if (res.status == 200) {
        const data = JSON.parse(res.data).response;
        data['itemStoreList'].forEach(element => {
          element.itemQuantity = 0;
        });
        this.itemData = data['itemStoreList'];

        console.log(JSON.parse(res.data));
      }
    })

    this.tab = categoryId.value;

  }

  totalAddCart: any;
  actionItem = async (item) => {
    debugger
    const header = await this.$http.getHeaderToken();
    let serviceId = parseInt(localStorage.getItem("serviceId"));
    let payload = {
      //userid:1,
      storeid: this.storeData.id,
      itemId: item.id,
      command: item.command,
      ServiceId: serviceId

    }
    this.$http.httpCall(false).post(this.$api.goTo().shopingCart(), payload, header).then((res: any) => {
      if (res.status == 200) {
        const data = JSON.parse(res.data).response;
        this.totalAddCart = data.shopingCartSummary;
        this.$cart.setData(data);

        console.log(this.itemData)

      }
    })
  }

}
