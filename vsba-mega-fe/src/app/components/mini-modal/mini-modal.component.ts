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
  @Input() position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left';

  isPopupOpen = false;
  buttonX = 0;
  buttonY = 0;

  private static activePopup: MiniModalComponent | null = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  togglePopup(event: MouseEvent) {
    if (MiniModalComponent.activePopup && MiniModalComponent.activePopup !== this) {
      MiniModalComponent.activePopup.closePopup();
    }
  
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = 180; // Adjust horizontal distance
    const offsetY = 210; // Adjust vertical distance
  
    if (!this.isPopupOpen) {
      if (this.position === 'bottom-left') {
        this.buttonX = rect.left - offsetX;
        this.buttonY = rect.bottom + window.scrollY;
      } else if (this.position === 'bottom-right') {
        this.buttonX = rect.right;
        this.buttonY = rect.bottom + window.scrollY;
      } else if (this.position === 'top-left') {
        this.buttonX = rect.left - offsetX;
        this.buttonY = Math.max(rect.top - offsetY + window.scrollY, 10); // Prevent clipping at top
      } else if (this.position === 'top-right') {
        this.buttonX = rect.right;
        this.buttonY = Math.max(rect.top - offsetY + window.scrollY, 10); // Ensure it's visible
      }
  
      this.isPopupOpen = true;
      MiniModalComponent.activePopup = this;
    } else {
      this.closePopup();
    }
  }
  

  closePopup() {
    this.isPopupOpen = false;
    MiniModalComponent.activePopup = null;
  }
  

}
