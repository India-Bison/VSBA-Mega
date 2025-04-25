import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  items: any[] = []
  constructor() {
    console.log(this.items, 'gsssssss');
   }  
}
