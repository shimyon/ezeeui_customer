import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss'],
})
export class ItemCategoryComponent implements OnInit {
  @Input() tab:any;
  @Output() selectedCategory=new EventEmitter();
  @Input() groupList=[];
  category:any;
  constructor() { }

  ngOnInit() {
this.category=this.tab!=null?this.tab:1;
  }
  changeCategory(ev:any){
   console.log(ev);
   this.selectedCategory.emit(ev.detail);
  }

}
