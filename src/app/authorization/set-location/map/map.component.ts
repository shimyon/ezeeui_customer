import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { google } from 'google-maps';
import { FindLocation } from 'src/services/findLocation.services';
declare var google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit,OnChanges {

  fabAction = false;
  address: string;
  containerDiv: HTMLDivElement;
  @ViewChild('map', { static: true }) mapElement: ElementRef;

  contentElement: HTMLElement;
  map: any;
  placesService: any;
  locationdata: any[];
  marker: google.maps.Marker;
  locationConfig = {
    name: '',
    cordinate: [],
  };
  autoLocationService: any;
  @Input() mapOptionConfig: any;
  @Input('locationSet') set locationSet(place) {
    if (place != null && place != '') {
      this.selectPlace(place);
    }

  }
  @Input('setCurrentLocation') set in(location) {
    if (location != null && location != '') {
      this.loadMap();
    }

  }
  @Input('searchInput') set searchInput(place) {
    if (place != null && place != '') {
      this.search(place);
    }
  }
  @Input('placeLocationCordinate') set placeLocationCordinate(location) {
    if (location != null && location != '') {
      this.placeMarker(location);
    }
  }
  @Output() selectedLocation = new EventEmitter();
  @Output() getSearchLocation = new EventEmitter();
  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
    private ngZone: NgZone, private _findservice: FindLocation) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.loadMap();
    //  let input = document.getElementsByClassName('searchbar-input');
    //  this.autoLocationService = new google.maps.places.AutocompleteService(input);


  }
  


  loadMap() {
    this.geolocation.getCurrentPosition()
      .then(resp => {
        const latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        const mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          mapTypeControl: false,
          disableDefaultUI: true,
          zoomControl: false,
          draggable: true,
          setMyLocationButtonEnabled: true,
          MyLocationEnabled: true,
          overviewMapControl: false,
        };

      //  this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions,

        );
        this.placesService = new google.maps.places.PlacesService(this.map);
        const cordinatelocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.placeMarker(cordinatelocation);
       
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }
 
  infowindow = new google.maps.InfoWindow();
  placeMarker(location: any) {
    const iconBase = 'assets/images/';
    const icons = {
      info: {
        icon: iconBase + 'mapinfo_pin.png'
      }
    };
    if (this.marker && this.marker.setMap) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: location,
      icon: icons['info'].icon,
      map: this.map,
      draggable: false,
     // animation: google.maps.Animation.BOUNCE,
      title: "Your Location :"
    });

    this.marker.bindTo('position', this.map, 'center');
    this.map.addListener("tilesloaded", () => {
      this.createInfoWindow(this.map, this.marker); 
      
    })};

  geocoder = new google.maps.Geocoder();

  createInfoWindow(map, marker) {
     let latLang=map.center;
    this._findservice.findLatLang(latLang, this.geocoder).then(res => {
      this.selectedLocation.emit(res[0]);
      let address = res[0].formatted_address
      this.infowindow.setContent("<b>Your Location :</b><div class='content'>" + address + "</div>");
      //this.infowindow.setStyle("background-color: red");
      this.infowindow.open(map, marker);

    });
   
  }

  selectPlace(place: any) {
    let location = {
      lat: null,
      lng: null,
      name: place.name
    };

    this.placesService.getDetails({ placeId: place.place_id }, (details) => {
      if (details != null) {
        this.ngZone.run(() => {
          this.locationConfig.cordinate = [details.geometry.location.lng(), details.geometry.location.lat()];
          this.locationConfig.name = place.description;
          this.selectedLocation.emit(this.locationConfig);
          location.name = details.name;
          location.lat = details.geometry.location.lat();
          location.lng = details.geometry.location.lng();
          this.map.setCenter({ lat: location.lat, lng: location.lng });
          this.placeMarker(location);
        });

      }
    });
  }



  search(place) {
    const config = {
      types: ['geocode'],
      input: place
    };
    this.autoLocationService.getPlacePredictions(config, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        const places = [];
        predictions.forEach((prediction) => {
          places.push(prediction);
          this.getSearchLocation.emit(places);
        });
      }
    });
  }

}
