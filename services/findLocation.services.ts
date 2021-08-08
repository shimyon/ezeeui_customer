import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FindLocation {
     findLatLang(latLng, geocoder) {
        return new Promise(function(resolve, reject) {
            geocoder.geocode({'latLng': latLng}, function(results, status) {
                if (status === 'OK') {
                    resolve([results[0]]);
                } else {
                   // reject(new Error('Couldnt\'t find the location '));
                }
        })
        })
    } 
}