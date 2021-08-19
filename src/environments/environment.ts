// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL:'https://ezzeisdevapp.azurewebsites.net',
  API_URL: 'http://thakurethan-001-site1.dtempurl.com',
  paytm: {
    MerchantID: "nTdwNG42786221736985",
    Key: "#lwdRC1dz2tvdSaA",
    callbackurl: "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID="
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
