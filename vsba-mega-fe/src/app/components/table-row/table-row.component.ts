import { JsonPipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-row',
  imports: [NgFor,NgIf, UpperCasePipe, NgClass,FormsModule,JsonPipe],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css'
})
export class TableRowComponent {

  @Input() item: any;
  @Input() columns: any;

  toggleExpand(item: any) {
    item.expanded = !item.expanded;
  }

  toggleParentSelection(item: any) {
    item.selected = !item.selected;
    // you can emit event if needed
  }

}
