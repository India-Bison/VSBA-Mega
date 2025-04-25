import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [NgClass, NgIf, NgFor],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
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
