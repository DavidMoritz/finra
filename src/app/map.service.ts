import { Injectable } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private mapProperties = {
    mapId: '75f09f1ac2062b2',
    center: { lat: 42, lng: -98 },
    zoom: 4,
  };

  constructor() {
    const localProperties = localStorage.getItem('mapProperties');

    if (localProperties) {
      this.mapProperties = JSON.parse(localProperties);
    }
  }

  getMapProperties() {
    return this.mapProperties;
  }

  saveMapProperties(googleMap: GoogleMap) {
    this.mapProperties.center = {
      lat: googleMap.getCenter()?.lat() || this.mapProperties.center.lat,
      lng: googleMap.getCenter()?.lng() || this.mapProperties.center.lng,
    };
    this.mapProperties.zoom = googleMap.getZoom() || this.mapProperties.zoom;
    localStorage.setItem('mapProperties', JSON.stringify(this.mapProperties));
  }
}
