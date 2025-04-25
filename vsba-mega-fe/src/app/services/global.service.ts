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
   }  
}
