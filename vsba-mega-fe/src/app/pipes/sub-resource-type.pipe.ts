import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subResourceType',
  standalone:true
})
export class SubResourceTypePipe implements PipeTransform {

  transform(resource_type: any[]) {
    if (!Array.isArray(resource_type)) return [];
    return resource_type.filter(item => {
      return item
    });
  }

}
