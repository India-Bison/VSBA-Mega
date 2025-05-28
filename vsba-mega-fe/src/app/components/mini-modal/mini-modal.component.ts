import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Input, input, Renderer2, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon-module.d-BeibE7j0';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-mini-modal',
  imports: [NgIf,CommonModule,MatIconModule,MatMenuModule,MatButtonModule],
  templateUrl: './mini-modal.component.html',
  styleUrl: './mini-modal.component.css'
})
export class MiniModalComponent {
 isOpen = false;
  openUpward = false;

  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild('menuDropdown') menuDropdown!: ElementRef;

  toggleDropdown() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      setTimeout(() => this.adjustDirection(), 0);
    }
  }

  adjustDirection() {
    const btnRect = this.menuBtn.nativeElement.getBoundingClientRect();
    const dropdownHeight = this.menuDropdown.nativeElement.offsetHeight;
    const spaceBelow = window.innerHeight - btnRect.bottom;

    this.openUpward = spaceBelow < dropdownHeight;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.isOpen = false;
    }
  }
  @Input() image: string = '';
  @Input() image_class: string = '';
  @Input() position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left';

  isPopupOpen = false;
  buttonX = 0;
  buttonY = 0;

  private static activePopup: MiniModalComponent | null = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('document', 'click', (event: Event) => {
      if (this.isPopupOpen && !this.elRef.nativeElement.contains(event.target)) {
        this.closePopup();
      }
    });
  
    this.renderer.listen('window', 'scroll', () => {
      if (this.isPopupOpen) {
        this.updatePopupPosition();
      }
    });
  }

  updatePopupPosition() {
    if (!this.isPopupOpen) return;
  
    const imageElement = this.elRef.nativeElement.querySelector('img');
    if (!imageElement) return;
  
    const rect = imageElement.getBoundingClientRect();
    const parentRect = this.elRef.nativeElement.getBoundingClientRect();
    const offsetX = 200;
    const offsetY = 250;
  
    if (this.position === 'bottom-left') {
      this.buttonX = rect.left - parentRect.left - offsetX;
      this.buttonY = rect.bottom - parentRect.top;
    } else if (this.position === 'bottom-right') {
      this.buttonX = rect.right - parentRect.left;
      this.buttonY = rect.bottom - parentRect.top;
    } else if (this.position === 'top-left') {
      this.buttonX = rect.left - parentRect.left - offsetX;
      this.buttonY = Math.max(rect.top - parentRect.top - offsetY, 10);
    } else if (this.position === 'top-right') {
      this.buttonX = rect.right - parentRect.left;
      this.buttonY = Math.max(rect.top - parentRect.top - offsetY, 10);
    }
  }
  
  

  togglePopup(event: MouseEvent) {
    if (MiniModalComponent.activePopup && MiniModalComponent.activePopup !== this) {
      MiniModalComponent.activePopup.closePopup();
    }
  
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = 200; // Adjust horizontal distance
    const offsetY = 250; // Adjust vertical distance
  
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
