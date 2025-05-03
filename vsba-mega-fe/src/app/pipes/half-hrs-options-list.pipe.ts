import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'halfHrsOptionsList',
  standalone: true,
})
export class HalfHrsOptionsListPipe implements PipeTransform {
  transform(_: any, interval: number = 30): { title: string, value: string }[] {
    const options: { title: string, value: string }[] = [];
  
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        if (hour == 0 && minute == 0) continue;
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        options.push({ title: `${h}:${m}`, value: `${h}:${m}` });
      }
    }
    return options;
  }
  
}
