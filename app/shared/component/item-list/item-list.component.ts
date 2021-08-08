import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariationSelectionPage } from '../../../authorization/variation-selection/variation-selection.page';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
@Input() tab:any;
@Input() itemList=[];
@Output() newItemEvent = new EventEmitter<any>();
itemQuantity=0;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  variation_selection(){
    this.modalController.create({component:VariationSelectionPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  }

  sellingCalc(itemCalc): any {
    let calculate = false;
    if (itemCalc.mrp < itemCalc.sellingPrice) {
      calculate = true;
      return calculate;
    }
    return calculate;
  }
  discountCalc(itemCalc):any{
    let calcPrecentDiscount=0;
    if (itemCalc.mrp < itemCalc.sellingPrice) {
      const totalDiscount=itemCalc.sellingPrice-itemCalc.mrp;
         calcPrecentDiscount=(totalDiscount/itemCalc.sellingPrice)*100;
         return Math.round(calcPrecentDiscount);
    }
  }

  addCart=(item)=>{
    item.command="Add";
    item.itemQuantity=1;
    this.newItemEvent.emit(item);
  }
  incrementQty(item){
    item.command="Add";
    item.itemQuantity++;
    this.newItemEvent.emit(item);
  }
  decrementQty(item){
    item.command="Decrease";
    item.itemQuantity--;
    this.newItemEvent.emit(item);
  }
}
