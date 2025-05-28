import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  sidebar: boolean = false
  constructor(public toastr: ToastrService) { }
  toastr_shows_function(
    message: string,
    title: string,
    type: 'success' | 'error' | 'info' | 'warning' | 'delete'
  ) {
    const toastr_config = {
      timeOut: 4000,
      progressBar: false,
      closeButton: true,
      toastClass: `toast-base custom-${type}-toast`,
      positionClass: 'toast-top-right',
      enableHtml: true,
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
      case 'delete':
        this.toastr.error(message, title, toastr_config);
        break;
      default:
        console.error(`Unknown toastr type: ${type}`);
        break;
        this.toastr.error('खूप मोठा error message आहे जो 2-3 ओळींपर्यंत जाईल.', 'चूक', {
          closeButton: true,
          toastClass: 'toast-base custom-error-toast',
        });
        this.toastr.error('This is a very long error message that will span multiple lines and should be handled properly by the toastr service.', 'Error', {
          closeButton: true,
          toastClass: 'toast-base custom-error-toast',
        });
    }
  }

  start_end_date_formate_return(form: any, date_range: any, start_control_name: string, end_control_name: string, isRequired: boolean = false,) {
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
