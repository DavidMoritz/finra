import { Component, computed, input } from '@angular/core';
import { Executive } from '../executive.model';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.css',
})
export class BioComponent {
  executive = input.required<Executive>();
  bgColor = computed(() => {
    return `background-color: ${this.executive().color}`;
  });
  avatarPath = computed(() => {
    return `assets/execs/${this.executive().img}`;
  });
}
