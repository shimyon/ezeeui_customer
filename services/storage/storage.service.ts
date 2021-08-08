import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  private _categoryData:any;
  private _verificationOtp:any;

 
  private _address = new BehaviorSubject<any>(null);
  public address$ = this._address.asObservable();
  constructor() { }

  getCategory=()=>{
    return this._categoryData;
  }
  setCategory=(value)=>{
    this._categoryData=value;
  }
  
  getVerification=()=>{
    return this._verificationOtp;
  }
  setVerification=(value)=>{
    this._verificationOtp=value;
  }
 

  setAddress=(value)=>{
    this._address.next(value);
  }
  




}
