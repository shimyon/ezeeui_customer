import { Component, Inject } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from './app.config';
import { MyEvent } from 'src/services/myevent.services';
import { Constants } from 'src/models/contants.models';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/httpCall/http.service';
import { ApiRouting } from './shared';
import { StorageService } from 'src/services/storage/storage.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rtlSide = "left";
  selectedIndex: any;
  appPages: any;
  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private platform: Platform, private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router,
    private geolocation: Geolocation,
    private myEvent: MyEvent,
    private uniqueDeviceID: UniqueDeviceID,
    private $storage: StorageService,
    private $http: HttpService,
    private $api: ApiRouting
  ) {
    this.initializeApp();
    this.myEvent.getLanguageObservable().subscribe(value => {
      this.navCtrl.navigateRoot(['./']);
      this.globalize(value);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.uniqueDeviceID.get()
        .then((uuid: any) => console.log("UI device id", uuid))
        .catch((error: any) => console.log(error));
      let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
      this.globalize(defaultLang);
      this.auth.authSubject.subscribe((res) => {
        debugger
        if (res != null) {
          if (res) {
            this.router.navigate(['./tabs']);
            this.getSetAddress();
          } else {
            this.router.navigate(['./']);
          }
        }
      });
      this.setCurrentLocation();
    });
  }

  async getSetAddress() {
    const header = await this.$http.getHeaderToken();
    console.log(header)
    this.$http.httpCall(false).get(this.$api.goTo().getCustomerAddress(), {}, header)
      .then((res: any) => {
        if (res.status == 200) {
          const addressInfo = JSON.parse(res.data);
          this.$storage.setAddress(addressInfo);
        }
      });
  }

  globalize(languagePriority) {
    this.translate.setDefaultLang("en");
    let defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  setDirectionAccordingly(lang: string) {
    switch (lang) {
      case 'ar': {
        this.rtlSide = "rtl";
        break;
      }
      default: {
        this.rtlSide = "ltr";
        break;
      }
    }
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  setCurrentLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      console.log(' ===== LOCATION -==-==== ', res.coords.latitude);
      // this.nativeStorage.setNative(ACTION_TYPE.USER_LOCATION, {
      //   latitude: res.coords.latitude,
      //   longitude: res.coords.longitude
      // });
    });
  }
}
