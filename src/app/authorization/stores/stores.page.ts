import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {
  storeList = [];
  constructor(private route: Router, private $api: ApiRouting, private $http: HttpService) { }

  ngOnInit() {
    this.getStoreList();
  }

  getStoreList = async () => {
    const header = await this.$http.getHeaderToken();
    debugger
    let address = JSON.parse(localStorage.getItem("defultAddress"));
    let payload = {
      pinCode: address.pinCode,
      latitude: address.latitude,
      longitude: address.longitude,
      serviceId: 1
    }
    this.$http.httpCall(true).post(this.$api.goTo().storeGetAll(), payload, header)
      .then((res: any) => {
        if (res.status == 200) {
          let getData = JSON.parse(res.data);
          this.storeList = getData['response'].storeList;
        }
      });
  }


  items() {
    this.route.navigate(['./item-category']);
  }
}
