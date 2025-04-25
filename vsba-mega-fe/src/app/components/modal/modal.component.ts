import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-modal',
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ModalComponent
        }
    ]
})
export class ModalComponent {
  @Input() is_popup_visible: boolean = false
  @Input() list: any = []
  @Input() label: string = ''
  @Input() width: any;
  @Input() scroll: any;
  @Input() redirect = true;
  @Input() is_mandatory = false;
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
