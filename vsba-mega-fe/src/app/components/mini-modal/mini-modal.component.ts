import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-mini-modal',
  imports: [NgIf],
  templateUrl: './mini-modal.component.html',
  styleUrl: './mini-modal.component.css'
})
export class MiniModalComponent {

  @Input() image: string = '';
  @Input() image_class: string = '';

  isPopupOpen = false;
  buttonX = 0;
  buttonY = 0;

  private static activePopup: MiniModalComponent | null = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  togglePopup(event: MouseEvent) {
    // Close the previously active popup before opening a new one
    if (MiniModalComponent.activePopup && MiniModalComponent.activePopup !== this) {
      MiniModalComponent.activePopup.closePopup();
    }

    if (!this.isPopupOpen) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      this.buttonX = rect.left - 180; // Adjust to push left
      this.buttonY = rect.bottom + window.scrollY;

      this.isPopupOpen = true;
      MiniModalComponent.activePopup = this; // Set this as the active popup
    } else {
      this.closePopup();
    }
  }

  closePopup() {
    this.isPopupOpen = false;
    MiniModalComponent.activePopup = null;
  }
  

}
