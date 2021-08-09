import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  
  constructor() { }

 
  setData(data: any) {

    this.apiData.next(data);
  }

}
