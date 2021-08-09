import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/httpCall/http.service';
import { ApiRouting } from '../../shared';
import { CategoryList, StoreDetail } from '../../utils';
import {StorageService} from '../../../services/storage/storage.service';
@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss'],
})
export class ItemCategoryComponent implements OnInit {
  categoryList: CategoryList[];
  storeDetail: StoreDetail;
  constructor(private route: Router,
     private $api: ApiRouting,
      private $http: HttpService,
      private $storage:StorageService) { }

  ngOnInit() {
    this.getCategoryService();
  }

  onCategory(data) {
    data.storedata=this.storeDetail;
    console.log(data)
     this.$storage.setCategory(data);
    this.route.navigate(['./items']);
  }
  reviews() {
    this.route.navigate(['./reviews']);
  }
  getCategoryService=async()=> {
    const header = await this.$http.getHeaderToken();
    let payload = {
      storeId: 1,
      latitude: "string",
      longitude: "string"

    }
    this.$http.httpCall(true).post(this.$api.goTo().storeCategoryById(), payload, header)
      .then((res: any) => {
        if (res.status == 200) {
          const data = JSON.parse(res.data).response;
          this.categoryList = data.categoryList;
          this.storeDetail = data.storeDetail;
        }
      });
  }
}
