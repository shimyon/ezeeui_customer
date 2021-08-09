import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, BaseAppConfig } from './app.config';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { CustomUISDK } from "@ionic-native/custom-uisdk/ngx"
import { AllInOneSDK } from '@ionic-native/all-in-one-sdk/ngx'
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './helper/jwt.interceptor';
 

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
	  BrowserModule, 
	  IonicModule.forRoot(), 
      AppRoutingModule,
      HttpClientModule,
      TranslateModule,   
    SharedModule,
         
      TranslateModule.forRoot({
        loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
   // CustomUISDK,
   NativeStorage,
   AllInOneSDK,
   UniqueDeviceID,
    SplashScreen,
    NativeGeocoder,
    Geolocation,
    HTTP,
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  //  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
