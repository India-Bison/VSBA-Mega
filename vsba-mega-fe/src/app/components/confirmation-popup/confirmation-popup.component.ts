import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-confirmation-popup',
    imports: [CommonModule],
    templateUrl: './confirmation-popup.component.html',
    styleUrl: './confirmation-popup.component.css',
    standalone: true,
})
export class ConfirmationPopupComponent {
  @Input() is_popup_visible: boolean = false
  @Input() list: any = []
  @Input() label: string = ''
  @Input() width: any;
  @Input() scroll: any;
  @Input() redirect = true;
  @Input() delete_icon = false;
  @Input() edit_icon = false;
  @Input() discard_icon = false;
  @Input() icon: string = '';           // icon name ya URL
  @Input() iconColor: string = '';      // bg color of the icon
  @Input() confirmText: string = 'Yes'; // Confirm button text
  @Input() confirmColor: string = 'bg-blue-600'; // Tailwind button bg class
  @Input() cancelText: string = 'Cancel';        // Cancel button text
  @Input() is_mandatory:boolean = false;
  @Input() show_cancel_icon:boolean = false;
  @Output() close_modal_clicked = new EventEmitter();
  @Output() confirm_modal_clicked = new EventEmitter<void>();

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
  }
  confirm() {
    this.confirm_modal_clicked.emit();
    this.is_popup_visible = false;
  }

}
