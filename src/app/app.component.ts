import { Component, ViewChild, inject, signal } from '@angular/core';
import {
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { ExecutiveComponent } from './executive/executive.component';
import executiveList from '../data/executives.json';
import { type Client, ClientsService } from './clients.service';
import { Executive } from './executive/executive.model';
import { BioComponent } from './executive/bio/bio.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GoogleMapsModule,
    ExecutiveComponent,
    BioComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  query = signal('');
  selectedExec?: Executive;
  title = 'angular-google-maps';
  options: google.maps.MapOptions = {
    mapId: '75f09f1ac2062b2',
    center: { lat: 42, lng: -98 },
    zoom: 4,
  };

  private clientsService = inject(ClientsService);

  locations: Client[] = this.clientsService.getAllClients(this.query());
  executives = executiveList;

  onMarkerClick(marker: MapAdvancedMarker) {
    const client = this.locations.find(
      (cl) => cl.name === marker.advancedMarker.title
    );
    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      `<div>
        <h3>${marker.advancedMarker.title}</h3>
        <h6>${client?.address}</h6>
        <h7>Assigned to: ${client?.execName}</h7>
      </div>`
    );
  }

  reset() {
    this.selectedExec = undefined;
    this.query.set('');
    this.locations = this.clientsService.getAllClients('');
  }

  deselectExec() {
    this.selectedExec = undefined;
    this.locations = this.clientsService.getNonExecutiveClients(this.query());
  }

  onSelectExec(exec: Executive) {
    this.selectedExec = exec;
    this.locations = this.clientsService.getExecutiveClients(
      exec.id,
      this.query()
    );
  }

  onSubmitQuery() {
    if (this.selectedExec) {
      this.onSelectExec(this.selectedExec);
    } else {
      this.locations = this.clientsService.getAllClients(this.query());
    }
  }

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
}
