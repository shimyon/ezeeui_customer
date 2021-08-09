import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceCalc'
})
export class PriceCalcPipe implements PipeTransform {

  transform(mrp: any, sellingPrice: any): any {
    let calculate = false;
    if (mrp < sellingPrice) {
      calculate = true;
      return calculate;
    }
    return calculate;
  }

}
