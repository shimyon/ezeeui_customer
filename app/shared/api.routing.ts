import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class ApiRouting {
    private AUTH_SERVER_ADDRESS = environment;
    constructor() { }
    paths = {
        root: () => '/',
        storeGetAll: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/Store/GetListing`,
        pinCodeLookup: (pincode) => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/PinCodeLookup/GetByCode/${pincode}`,
        categoryGetAll:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/Category/GetAll`,
        categoryGetById:(id)=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/Category/Get/${id}`,
        categoryServiceAvailableGetAll:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/ServiceCategory/GetAll`,
        categoryServiceAvailableGetById:(id)=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/ServiceCategory/Get/${id}`,
        serviceAvailableGetAll:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/Service/GetAll`,
        serviceAvailableGetById:(id)=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/Service/${id}`,
        storeCategoryById:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/Category/GetStoreCategoryListing`,
         getStoreItemListing:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/Item/GetStoreItemListing`,
         createCustomerAddress:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/CustomerAddress/Create`,
         getCustomerAddress:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/CustomerAddress/User/GetAll`,
         shopingCart:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/ShopingCart`,
         setDefaultAddress:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/CustomerAddress/SetDefaultAddress`,
         createUser:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/Account/User/Create`,
         loginUser:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/Account/Login`,
         customerLoginUser:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/Customer/LoginUsingPhoneNumber`,
         loginUsingOtp:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/LoginUsingOtp`,
        refreshToken: () => `${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/GenerateToken`,
         resndOtp:()=>`${this.AUTH_SERVER_ADDRESS.API_URL}/api/IdentityUser/Customer/ResendOtp`
       
    };

    goTo() {
        return this.paths;
    }
}