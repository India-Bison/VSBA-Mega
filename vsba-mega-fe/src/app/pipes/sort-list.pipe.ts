import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortList'
})
export class SortListPipe implements PipeTransform {

  transform(list: any[], sort_by: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!Array.isArray(list) || !sort_by) {
      return list;
    }
    return list.sort((a, b) => {
      const valA = a?.[sort_by];
      const valB = b?.[sort_by];
      if (valA == null || valB == null) return 0;
      const compare = typeof valA == 'string'
        ? valA.localeCompare(valB)
        : valA > valB ? 1 : valA < valB ? -1 : 0;
      return order == 'asc' ? compare : -compare;
    });
  }
}
