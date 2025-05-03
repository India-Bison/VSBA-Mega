import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor( public toastr: ToastrService) {}
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
  start_end_date_formate_return(form: any, date_range: any, start_control_name: string, end_control_name: string) {
    if (date_range && date_range.start && date_range.end) {
      const form_object: any = {};
      Object.keys(form.controls).forEach(control => {
        const control_value = form.get(control)?.value;
        if (typeof control_value === 'object' && control_value !== null && 'start' in control_value && 'end' in control_value) {
          form_object[control] = {
            start: date_range.start,
            end: date_range.end
          };
        }
      });
      form_object[start_control_name] = date_range.start;
      form_object[end_control_name] = date_range.end;
      form.patchValue(form_object);
    }
  }
  
}
