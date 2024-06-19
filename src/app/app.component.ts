import { Component, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { ExecutiveComponent } from './executive/executive.component';
import executiveList from '../data/exectutives.json';
import clientList from '../data/clients.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule, ExecutiveComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-google-maps';
  options: google.maps.MapOptions = {
    mapId: '75f09f1ac2062b2',
    center: { lat: 42, lng: -98 },
    zoom: 5,
  };

  executives = executiveList;

  locations: any[] = clientList;

  ngOnInit() {
    const parser = new DOMParser();
    // this is an SVG string of a house icon, but feel free to use whatever SVG icon you'd like
    // const svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
    //                   <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
    //                   </svg>`;
    // this.nzLocations.forEach((location) => {
    //   location.content = parser.parseFromString(
    //     svgString,
    //     'image/svg+xml'
    //   ).documentElement;
    // });
    // we will be using Google's beach flag image as an example, but feel free to use any image you'd like
    // const beachFlag =
    //   'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    // this.auLocations.forEach((location) => {
    //   let imgTag = document.createElement('img');
    //   imgTag.src = beachFlag;
    //   location.content = imgTag;
    // });
  }

  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      `<h1>${marker.advancedMarker.title} totally</h1>`
    );
  }

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
}
