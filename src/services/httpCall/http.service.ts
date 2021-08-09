import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../environments/environment';

import { NativeDataService } from '../nativeData/native-data.service';
import { ACTION_TYPE } from '../../app/utils/native-actions';
import { ToastService } from '../toast/toast.service';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  API_BASE: string = environment.API_URL;
  constructor(
   private nativeStorage: NativeDataService,
    private http: HTTP,
    private toaster: ToastService,
    private loader: LoaderService
  ) {
    //this.loader.dismiss();
  }


   setToken=async(returnToken)=> {
    return await this.nativeStorage.setNative(ACTION_TYPE.ACCESS_TOKEN, { token: returnToken }).then(res => {
      return res;
    });
  }

   getToken=async()=> {
    const token = await this.nativeStorage.getNative(ACTION_TYPE.ACCESS_TOKEN);
    return token;
  }



  httpCall = (isLoading: boolean = true) => {
    this.http.setDataSerializer('json');
    if (isLoading) {
      this.loader.show();
    }
    return {
      get: (url, payload, headers) => {
        console.log(' ====== PAYLOAD ====== ', payload);
        return new Promise((resolve, reject) => {
          this.http.get(url, payload, headers).then(res => {
            if (isLoading) {
              this.loader.dismiss();
            }
            resolve(res);
          }).catch(err => {
            this.printError(err);
            if (isLoading) {
             this.loader.dismiss();
            }
            reject(err);
          });
        });
      },
      post: (url, payload, headers) => {
        console.log(' ====== PAYLOAD ====== ', payload);
        return new Promise((resolve, reject) => {
          this.http.post(url, payload, headers).then(res => {
            if (isLoading) {
              this.loader.dismiss();
            }
            console.log('Post Response', res);
            resolve(res);
          }).catch(err => {
            this.printError(err);
            if (isLoading) {
              this.loader.dismiss();
            }
            reject(err);
          });
        });
      },
      put: (url, payload, headers) => {
        console.log(' ====== PAYLOAD ====== ', payload);
        return new Promise((resolve, reject) => {
          this.http.put(url, payload, headers).then(res => {
            if (isLoading) {
              this.loader.dismiss();
            }
            resolve(res);
          }).catch(err => {
            this.printError(err);
            if (isLoading) {
           this.loader.dismiss();
            }
            reject(err);
          });
        });
      },
      delete: (url, payload, headers) => {
        console.log(' ====== PAYLOAD ====== ', payload);
        return new Promise((resolve, reject) => {
          this.http.delete(url, payload, headers).then(res => {
            if (isLoading) {
              this.loader.dismiss();
            }
            resolve(res);
          }).catch(err => {
            this.printError(err);
            if (isLoading) {
              this.loader.dismiss();
            }
            reject(err);
          });
        });
      }
    };
  }


  printError(err) {
    let message;
    console.log(': ====  ERROR ==== ', err, ' === STATUS ==== ', err.status);
    const error = JSON.parse(err.error);
  
    if (err.status === 401) {
      message = error.message.message;
    } else if (err.status === 409) {
      message = error.message;
    } else if (err.status === 400) {
      message = error.errors[0];
    } else {
      message = 'Something went wrong.';
    }
    const toaster = {
      header: 'Opps!',
      message,
      position: 'top'
    };
   // this.toaster.show(toaster);
  }

  successMessage(res: any, success: string) {
    let message;
    console.log('success response', res)
    const response = typeof (res) === 'object' ? JSON.parse(res.data) : res.data;
    console.log('convert data', response)
    if (res.status === 200) {
      if (response.ok) {
        message = success;
      } else {
        message = response.msg.emailError;
      }
    } else {
      message = success;
    }
    const toaster = {
      header: '',
      message,
      position: 'top'
    };
    this.toaster.show(toaster);
  }



   getHeaderToken=async()=> {
     debugger;
    const headerToken =   await this.nativeStorage.getNative(ACTION_TYPE.ACCESS_TOKEN);
    const header = {
      Authorization: 'Bearer ' + headerToken
    };
    return header;
  }

}
