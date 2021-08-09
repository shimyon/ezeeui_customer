import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asUrl'
})
export class BackgroundUrlPipe implements PipeTransform {

  transform(value: string, type: string): string {
    if (value != null) {
      return value;
    }


    switch (type) {
      case 'groceries':
        return '../../../assets/images/placeholder/groceries.png';

      case 'services':
        return '../../../assets/images/placeholder/services.png';

      case 'category':
        return '../../../assets/images/placeholder/item.png';
      case 'item2':
        return '../../../assets/images/placeholder/item2.png';
      case 'store':
        return '../../../assets/images/placeholder/store.png';
      default:
        return '../../../assets/images/placeholder/Logo-placeholder.png';
    }


  }


}
