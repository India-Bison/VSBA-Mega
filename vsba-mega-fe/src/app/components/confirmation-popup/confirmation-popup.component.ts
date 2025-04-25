import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.css'
})
export class ConfirmationPopupComponent {
  @Input() is_popup_visible: boolean = false
  @Input() list: any = []
  @Input() label: string = ''
  @Input() width: any;
  @Input() scroll: any;
  @Input() redirect = true;
  @Input() icon: string = '';           // icon name ya URL
  @Input() img: string = '';           // icon name ya URL
  @Input() iconColor: string = '';      // bg color of the icon
  @Input() confirmText: string = 'Yes'; // Confirm button text
  @Input() confirmColor: string = 'bg-blue-600'; // Tailwind button bg class
  @Input() cancelText: string = 'Cancel';        // Cancel button text
  @Input() is_mandatory:boolean = false;
  @Input() show_cancel_icon:boolean = false;
  @Output() close_modal_clicked = new EventEmitter();
  @HostListener('document:keydown.escape', ['$event'])

  handleEscape(event: KeyboardEvent) {
    this.close()
  }
  constructor(public router: Router, public ar: ActivatedRoute) { }
  open() {
    this.is_popup_visible = true
  }

  close() {
    if (!this.is_popup_visible) return;
    this.is_popup_visible = false;
    this.close_modal_clicked.emit();

    if (this.redirect) {
      const url = this.router.url.split('?')[0]; // Remove query parameters from the URL
      this.router.navigateByUrl(url);
    }
  }

}
