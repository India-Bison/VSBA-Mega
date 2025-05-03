import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

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

}
