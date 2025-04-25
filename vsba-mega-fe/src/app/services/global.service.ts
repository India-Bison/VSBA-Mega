import { Injectable } from '@angular/core';

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
}
