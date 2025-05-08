import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [NgIf,NgClass],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: true,
})
export class HeaderComponent {

  errorMessage: any = false;
  @Input() label: any = ''
  @Input() hide_school_button: boolean = false;
  @Input() sub_label: any = ''
  show_user_name: any = true;
  params: any = {}

  check_in_modal = false;

  showBackButton: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showBackButton = this.router.url.includes('/form'); // Check if the current route contains "/form"
    });
  }

  goBack() {
    if (this.showBackButton) { // Only call goBack() if on the form page
     window.history.back();
    }
  }

}
