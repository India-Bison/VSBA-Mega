import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dynamic-icon',
    imports: [],
    templateUrl: './dynamic-icon.component.html',
    styleUrl: './dynamic-icon.component.css'
})
export class DynamicIconComponent {
  @Input() name!: string;        // Icon name (e.g., 'home', 'dashboard')
  @Input() selected = false;     // Whether the icon is selected or not
  @Input() alt = '';             // Alternative text for the icon

  // Dynamically construct the icon path
  getIconPath(): string {
    return `../../../assets/${this.selected ? `${this.name}-blue.svg` : `${this.name}.svg`}`;
  }
}
