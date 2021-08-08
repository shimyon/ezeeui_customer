import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared';
import { appConfig } from 'src/app/utils';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-saved-addresses',
  templateUrl: './saved-addresses.page.html',
  styleUrls: ['./saved-addresses.page.scss'],
})
export class SavedAddressesPage implements OnInit {
  
  deliveryLocation = []
  appData=appConfig;
  constructor(private $http: HttpService, private $api: ApiRouting,private route:Router) { }

  ngOnInit() {
    this.getSetAddress();
  }

  getSetAddress=async()=> {
      const header = await this.$http.getHeaderToken();
      this.$http.httpCall(true).get(this.$api.goTo().getCustomerAddress(), {}, header)
        .then((res: any) => {
          if (res.status == 200) {
            this.deliveryLocation=JSON.parse(res.data).response;
          } 
        });
  }

  getImageData(value){
      return this.appData.setImageAddress.filter(a=>a.value===value).length?this.appData.setImageAddress.filter(a=>a.value===value)[0].image:null;
  }
  
selectedAddress=async(addressInfo)=>{
  const header = await this.$http.getHeaderToken();
  const payload={
    userid:addressInfo.userId,
    customerAddressId:addressInfo.id
  }
  this.$http.httpCall(false).post(this.$api.goTo().setDefaultAddress(),payload, header)
    .then((res: any) => {
      if (res.status == 200) {
       addressInfo.isDefaultAddress=true;
      } 
    });
}

  add(){
    this.route.navigate(['./set-location']);
  }


}
