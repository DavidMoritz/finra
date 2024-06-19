import { Component, computed, inject, input, output } from '@angular/core';
import { Executive } from './executive.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-executive',
  standalone: true,
  imports: [],
  templateUrl: './executive.component.html',
  styleUrl: './executive.component.css',
})
export class ExecutiveComponent {
  executive = input.required<Executive>();
  selected = input.required<Boolean>();
  select = output<Executive>();
  private clientsService = inject(ClientsService);

  get clients() {
    return this.clientsService.getExecutiveClients(this.executive().id);
  }

  bgColor = computed(() => {
    return `background-color: ${this.executive().color}`;
  });
  avatarPath = computed(() => {
    return `assets/execs/${this.executive().img}`;
  });

  onSelectExecutive() {
    this.select.emit(this.executive());
  }
}
