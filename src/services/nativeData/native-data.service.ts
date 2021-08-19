import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class NativeDataService {

  constructor(
    private nativeStorage: NativeStorage
  ) { }

  async setNative(action, values) {
    return await new Promise((resolve, reject) => {
      this.nativeStorage.setItem(action, values)
        .then(
          () => resolve({ status: true, token: action }),
          error => reject(error)
        );
    });
  }

  getNative(action) {
    console.log(' ==== ACTION GET ==== ', action);
    return this.nativeStorage.getItem(action)
      .then(
        data => {
          console.log(' === Get Token === ', data);
          return data;
        },
        error => {
          console.log(error);
          return error;
        }
      );
  }

  deleteNative(action) {
    console.log('-----Action Delete--------', action);
    return this.nativeStorage.remove(action).then(data => {
      console.log('---Remove data-------', data);
      return data;
    }, error => {
      console.log(error);
      return error;
    }
    );
  }
}
