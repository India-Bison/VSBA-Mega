import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizString',
  standalone: true
})
export class CapitalizStringPipe implements PipeTransform {

  
  transform(value: string): string {
    if (!value) return value;
    const shortForms = ['cctv'];

    return value
      .toLowerCase()
      .split('_')
      .map(word => {
        const matchedShortForm = shortForms.find(shortForm => word.toLowerCase().includes(shortForm.toLowerCase()));
        if (matchedShortForm) return word.toUpperCase();
        else return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}
