import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  items: any = {
    projects: [],
    sub_projects: []
  };
  constructor() {
    console.log(this.items, 'gsssssss');
    this.get_from_local_storage();
  }

  save_in_local_storage() {
    console.log(this.items, 'gsssssss');
    localStorage.setItem('projects', JSON.stringify(this.items.projects));
    localStorage.setItem('sub_projects', JSON.stringify(this.items.sub_projects));
  }
  get_from_local_storage() {
    const projects = localStorage.getItem('projects');
    const sub_projects = localStorage.getItem('sub_projects');
    if (projects) {
      this.items.projects = JSON.parse(projects);
    }
    if (sub_projects) {
      this.items.sub_projects = JSON.parse(sub_projects);
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
