import { Component, computed, input, output } from '@angular/core';
import { Executive } from './exectutive.model';

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

  avatarPath = computed(() => {
    return 'assets/execs/' + this.executive().img;
  });

  onSelectExecutive() {
    this.select.emit(this.executive());
  }
}
