import { IfStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { resolve } from 'dns';
import { StorageService } from 'src/services/storage/storage.service';

import { HttpService } from '../../../services/httpCall/http.service';
import { ApiRouting, validationMessage } from '../../shared';
import { ToastService } from '../../shared/toast/toast.service';
import { message, appConfig, Address } from '../../utils';

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.page.html',
  styleUrls: ['./set-location.page.scss'],
})
export class SetLocationPage implements OnInit {
  openFrom;
  fabAction = false;
  actionList = appConfig;
  queryText: any;
  query: any;
  isValidButton = false;
  other = false;
  places = [];
  AddressForm: FormGroup;
  placeSelect: any;
  locationReset: string;
  IsButton = true;
  @ViewChild('formRef', { static: true }) formRef: FormGroupDirective;
  optionMapConfig = {
    'height': '100vh'
  };
  selectedLocationPoint = {};
  locationName: string;
  validationMessages: any;
  addressType: any;
  isValid = false;
  constructor(private navCtrl: NavController,
    private activeRoute: ActivatedRoute,
    private $http: HttpService,
    private $api: ApiRouting,
    private $toast: ToastService,
    private formBuilder: FormBuilder,
    private $storage: StorageService,
    private validMessage: validationMessage) { }

  ngOnInit() {
    this.openFrom = this.activeRoute.snapshot.paramMap.get('openFrom');
    this.AddressForm = this.formBuilder.group({
      flat_building_name: ['', [Validators.required]],
      reach_optional: [''],
      phoneno: ['', [Validators.pattern('[6-9]\\d{9}')]],
      other_add: ['']
    });
    this.validationMessages = this.validMessage.goTo();
    console.log(this.actionList)
  }
  toggleFab() {
    this.fabAction = !this.fabAction;
  }
  tabs = async () => {

    if (!this.AddressForm.valid) {
      this.isValid = true;
      return true;
    }
    if (this.AddressForm.value["other_add"] != null && this.AddressForm.value["other_add"] != "") {
      this.addressType.text = this.AddressForm.value["other_add"];
    }

    let payload: Address = {
      flatFloorBuildingName: this.AddressForm.value["flat_building_name"] + ", " + this.selectedLocationPoint["flatFloorBuildingName"],
      addressType: this.addressType.value,
      addressTypeLabel: this.addressType.text,
      city: this.selectedLocationPoint["city"] != null ? this.selectedLocationPoint["city"] : "",
      contactNumber: this.AddressForm.value['phoneno'],
      landmark: this.selectedLocationPoint["landmark"] != null ? this.selectedLocationPoint["landmark"] : "",
      latitude: this.selectedLocationPoint["latitude"] != null ? JSON.stringify(this.selectedLocationPoint["latitude"]) : "",
      longitude: this.selectedLocationPoint["longitude"] != null ? JSON.stringify(this.selectedLocationPoint["longitude"]) : "",
      pinCode: this.selectedLocationPoint["pinCode"] != null ? this.selectedLocationPoint["pinCode"] : "",

    }
    const header = await this.$http.getHeaderToken();
    this.$http.httpCall(true).post(this.$api.goTo().createCustomerAddress(), payload, header).then((res: any) => {
      if (res.status == 200) {
        this.GoToHome();
      }
    });
  }

  async GoToHome() {
    await this.getSetAddress();
    if (this.openFrom) {
      if (this.openFrom == 'cart') {
        this.navCtrl.navigateForward(['./cart']);
      }
    } else {
      this.navCtrl.navigateRoot(['./tabs']);
    }
  }

  getSetAddress = async () => {
    return new Promise(async (result, reject) => {
      const header = await this.$http.getHeaderToken();
      this.$http.httpCall(true).get(this.$api.goTo().getCustomerAddress(), {}, header)
        .then((res: any) => {
          if (res.status == 200) {
            const addressInfo = JSON.parse(res.data).response;
            this.$storage.setAddress(addressInfo);
          }
          result(true);
        }, reject);
    });
  }

  SearchPlace() {
    if (this.queryText !== '') {
      this.query = this.queryText;
    } else {
      this.places = [];
    }
  }
  locationSearch(item) {
    this.places = item;
  }
  selectedLocationData(item) {
    // this.queryText = item.name;
    // this.places = [];
    this.queryText = item.formatted_address;
    let getAddressPostalCode = item.address_components;
    this.selectedLocationPoint["flatFloorBuildingName"] = item.formatted_address;
    this.selectedLocationPoint["latitude"] = item.geometry.location.lat();
    this.selectedLocationPoint["longitude"] = item.geometry.location.lng();
    getAddressPostalCode.forEach(element => {

      if (element.types[0] == "neighborhood") {
        this.selectedLocationPoint["landmark"] = element.short_name;
      } else if (element.types[0] == "locality") {
        this.selectedLocationPoint["city"] = element.short_name;
      } else if (element.types[0] == "postal_code") {
        this.selectedLocationPoint["pinCode"] = element.short_name;
        this.getLocationExists(element.short_name);
      }
    });
  }
  selectPlace(place) {
    this.placeSelect = place;
    this.places = [];
  }
  count = 1;
  currentLocation() {
    this.locationReset = "RESET" + this.count;
    this.count++;
  }

  getLocationExists = async (pincode) => {
    const header = await this.$http.getHeaderToken();
    // pincode = 173023;
    this.$http.httpCall(true).get(this.$api.goTo().pinCodeLookup(pincode), {}, header)
      .then((res: any) => {
        let data = JSON.parse(res.data).response;

        if (res.status == 200) {
          this.IsButton = false;
          console.log(res);
        } else {
          const toaster = {
            message: data.message,
            position: 'top'
          };
          this.$toast.show(toaster);
          this.IsButton = true;
        }
      });
  }
  saveAddress(type) {
    this.isValidButton = true;
    this.addressType = type;
    if (type.value === 453) {
      this.other = true;
    }
  }

}
