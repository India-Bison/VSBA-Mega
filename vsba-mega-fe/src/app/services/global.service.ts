import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  sidebar:boolean = false
  constructor(public toastr: ToastrService) { }
  toastr_shows_function(message: string, title: string, type: 'success' | 'error' | 'info' | 'warning') {
    const toastr_config = {
      timeOut: 20000,
      progressBar: true,
      closeButton: true
    };
    switch (type.toLowerCase()) {
      case 'success':
        this.toastr.success(message, title, toastr_config);
        break;
      case 'error':
        this.toastr.error(message, title, toastr_config);
        break;
      case 'info':
        this.toastr.info(message, title, toastr_config);
        break;
      case 'warning':
        this.toastr.warning(message, title, toastr_config);
        break;
      default:
        console.error(`Unknown toastr type: ${type}`);
        break;
    }
  }
  start_end_date_formate_return(form: any,date_range: any,start_control_name: string,end_control_name: string,isRequired: boolean = false,) {
    const startControl = form.get(start_control_name);
    const endControl = form.get(end_control_name);
    if (date_range && date_range.start && date_range.end) {
      const form_object: any = {};
      form_object[start_control_name] = date_range.start;
      form_object[end_control_name] = date_range.end;
      form.patchValue(form_object);
    }
    if (isRequired) {
      startControl?.setValidators(Validators.required);
      endControl?.setValidators(Validators.required);

      startControl?.updateValueAndValidity();
      endControl?.updateValueAndValidity();
    }
  }

}
