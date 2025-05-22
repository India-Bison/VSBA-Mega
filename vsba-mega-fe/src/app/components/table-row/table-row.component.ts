import { CommonModule, JsonPipe, NgClass, NgFor, NgIf, NgStyle, NgSwitch, UpperCasePipe } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, Output, QueryList } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MiniModalComponent } from '../mini-modal/mini-modal.component';

@Component({
  selector: 'app-table-row',
  imports: [NgFor,NgIf, UpperCasePipe, NgClass,FormsModule,JsonPipe,NgSwitch,CommonModule,TableRowComponent,MiniModalComponent,NgStyle],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css'
})
export class TableRowComponent {

  @Input() items: any[] = []; 
  @Input() columns: any;
  @Output() selectedIdsChange = new EventEmitter<any>();

  toggleExpand(item: any) {
    item.expanded = !item.expanded;
  }
  getPillColor(column: any, item: any): string {
  const status = item[column.key];
  const pill = column.pill_colors?.find((p: any) => p.value === status);
  return pill?.color || '#000'; // Default to black if no match
}


  // toggleParentSelection(item: any) {
  //   item.selected = !item.selected;
  //   // you can emit event if needed
  // }



  @Input() params: any = {};
  @Input() pagination: boolean = true
  @Input() label: any = ''
  @Input() description: any = ''
  @Input() status: 'Border' | 'Dotted' = 'Border';
  @Input()currentPage = 1;
  @Input()totalPages = 1;
  @Input()totalItems = 3;
  @Input()itemsPerPage = 10;
  @Input() isChild: boolean = false;

  active_tab = 'Project';
  tabList = [
    {
      name: 'All',
      action: () => {
        this.active_tab = 'All',
          console.log('All tab clicked')
      }
    },
    {
      name: 'Pending',
      action: () => {
        this.active_tab = 'Pending';
        console.log('Pending tab clicked');
      }
    }, {
      name: 'Approved',
      action: () => {
        this.active_tab = 'Approved';
        console.log('Approved tab clicked');
      }
    }, {
      name: 'Reject',
      action: () => {
        this.active_tab = 'Reject';
        console.log('Reject tab clicked');
      }
    }, {
      name: 'Disabled',
      action: () => {
        this.active_tab = 'Disabled';
        console.log('Disabled tab clicked');
      }
    },
    {
      name: 'Drafts',
      action: () => {
        this.active_tab = 'Drafts';
        console.log('Drafts tab clicked');
      }
    },
  ];

  @ContentChildren('*', { descendants: true, read: ElementRef }) projectedContent!: QueryList<ElementRef>;

  isContentEmpty: boolean = true;

  get uniqueItems() {
    return this.items.filter((item: { key: string }, index: number, self: { key: string }[]) =>
      index === self.findIndex((t: { key: string }) => t.key === item.key)
    );
  }
  
  

  ngAfterContentInit() {
    // Check if there are any content children
    this.isContentEmpty = this.projectedContent.length === 0;
  }

  // State to track which column is expanded per row
  expandedState: { [rowIndex: number]: string | null } = {};


  constructor(public gs: GlobalService, public router : Router, public ar:ActivatedRoute) { }
  ngOnInit(): void {
    // this.items = this.gs.items
   setTimeout(() => {
     const firstItemWithChildren = this.items.find(item => item.children?.length);
  if (firstItemWithChildren) {
    firstItemWithChildren.expanded = true;
  }
   }, 1000);
  }
  sortData(key: string, order: 'asc' | 'desc') {
    this.router.navigate([], {
      relativeTo: this.ar,
      queryParams: {
        sort_by: key,
        sort_order: order
      },
      queryParamsHandling: 'merge',
    });
  }

  // Dummy data with children
  

  // Toggle sub-column expansion per row and column
  toggleSubColumn(rowIndex: number, columnKey: string): void {
    if (this.expandedState[rowIndex] === columnKey) {
      this.expandedState[rowIndex] = null;
    } else {
      this.expandedState[rowIndex] = columnKey;
    }
  }


  // Pagination funcation
  async handlePageChange(page: number) {
    this.currentPage = page;
  }

  allSelected: boolean = false;

  toggleAllSelection(): void {
    this.allSelected = !this.allSelected;
    this.items.forEach((item: any) => {
      item.selected = this.allSelected;

      if (item.children && item.children.length) {
        item.children.forEach((child: any) => {
          child.selected = this.allSelected;
        });
      }
    });
  }




  toggleChildSelection(parent: any): void {
    // If all children selected, set parent to selected
    parent.selected = parent.children.every((child: any) => child.selected);

    // Recheck header state
    this.checkAllSelected();
  }

  checkAllSelected(): void {
    this.allSelected = this.items.every((item: any) => {
      const childrenSelected = item.children?.every((child: any) => child.selected) ?? true;
      return item.selected && childrenSelected;
    });
  }


  redirect_to_project_form(id: any) {
    this.router.navigate(['/project/form'], { queryParams: { type: 'Project', parent_id: id, } });
  }

  menuVisibleIndex: number | string | null = null;

  toggleMenu(index: number | string): void {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }
  

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  this.menuVisibleIndex = null;
}

isDropdownOpen: number | null = null;

toggleDropdown(index: number) {
  this.isDropdownOpen = this.isDropdownOpen === index ? null : index;
}
onCheckboxClick(event: MouseEvent, item: any): void {
  event.stopPropagation(); // Prevent the click event from bubbling up
  this.toggleParentSelection(item); // Optional: still call your selection method
}

toggleParentSelection(item: any): void {
  item.selected = !item.selected; // This toggles the selection

  // If item has children, update their selection as well
  if (item.children && item.children.length) {
    item.children.forEach((child: any) => child.selected = item.selected);
  }

  this.emitSelectedIds(); // Emit the selected IDs
}

emitSelectedIds(): void {
  const selectedIds: any[] = [];

  this.items.forEach(item => {
    if (item.selected) selectedIds.push(item.id);

    if (item.children && item.children.length) {
      item.children.forEach((child:any) => {
        if (child.selected) selectedIds.push(child.id);
      });
    }
  });

  this.selectedIdsChange.emit(selectedIds); // Emit to parent
}




}
