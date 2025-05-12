import { CommonModule, DatePipe, JsonPipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MiniModalComponent } from '../mini-modal/mini-modal.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'app-list',
  imports: [NgFor, NgIf, NgClass, UpperCasePipe, FormsModule,CommonModule,DatePipe,MiniModalComponent,PaginationComponent,DateRangePickerComponent,TableRowComponent],
  templateUrl:'./list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
})
export class ListComponent {
  // params: any = {};
  // items: any[] = [];
  @Input() items: any = {}
  @Input() params: any = {};
  @Input() columns: any
  @Input() pagination: boolean = true
  @Input() label: any = ''
  @Input() description: any = ''
  @Input() status: 'Border' | 'Dotted' = 'Border';
  @Input()currentPage = 1;
  @Input()totalPages = 1;
  @Input()totalItems = 3;
  @Input()itemsPerPage = 10;
  @Output() selectedIdsChange = new EventEmitter<any>();

  active_tab = 'Project';
  date:any = '';
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
     this.loadDummyData();
    console.log(this.items, 'Items in List Component');
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
  loadDummyData() {
    this.items = [
      {
        id: 1,
        type: 'Project',
        name: 'Rudra',
        resource_type: 'Computer Labs, Classrooms, swimming pool',
        slot_type: 'Full Day',
        startdate_enddate: '12/03/2025 - 25/03/2025',
        status: 'Rejected',
        children: [
          {
            id: 4,
            type: 'Project',
            name: 'Bhavesh',
            resource_type: 'Computer Labs, Classrooms, swimming pool',
            slot_type: 'Full Day',
            startdate_enddate: '12/03/2025 - 25/03/2025',
            status: 'Pending',
             children: [
          {
            id: 4,
            type: 'Project',
            name: 'Bhavesh',
            resource_type: 'Computer Labs, Classrooms, swimming pool',
            slot_type: 'Full Day',
            startdate_enddate: '12/03/2025 - 25/03/2025',
            status: 'Pending',
          },
          {
            id: 5,
            type: 'Project',
            name: 'Arun',
            resource_type: 'Computer Labs, Classrooms, swimming pool',
            slot_type: 'Full Day',
            startdate_enddate: '12/03/2025 - 25/03/2025',
            status: 'Pending'
          },
        ]
          },
          {
            id: 5,
            type: 'Project',
            name: 'Arun',
            resource_type: 'Computer Labs, Classrooms, swimming pool',
            slot_type: 'Full Day',
            startdate_enddate: '12/03/2025 - 25/03/2025',
            status: 'Pending'
          },
        ]
      },
      {
        id: 2,
        type: 'Project',
        name: 'Bhavesh',
        resource_type: 'Computer Labs, Classrooms, swimming pool',
        slot_type: 'Full Day',
        startdate_enddate: '12/03/2025 - 25/03/2025',
        status: 'Pending',
        children: [
          {
            id: 4,
            type: 'Project',
            name: 'Bhavesh',
            resource_type: 'Computer Labs, Classrooms, swimming pool',
            slot_type: 'Full Day',
            startdate_enddate: '12/03/2025 - 25/03/2025',
            status: 'Pending'
          },
        ]
      },
      {
        id: 3,
        type: 'Project',
        name: 'Mayur',
        resource_type: 'Computer Labs, Classrooms, swimming pool',
        slot_type: 'Full Day',
        startdate_enddate: '12/03/2025 - 25/03/2025',
        status: 'Approved',
        children: [
          {
            type: 'Project',
            name: 'Shreeram',
            resource_type: 'Computer Labs, Classrooms, swimming pool',
            slot_type: 'Full Day',
            startdate_enddate: '12/03/2025 - 25/03/2025',
            status: 'Approved',
          }
        ]
      }
    ];
  }

  // Toggle sub-column expansion per row and column
  toggleSubColumn(rowIndex: number, columnKey: string): void {
    if (this.expandedState[rowIndex] === columnKey) {
      this.expandedState[rowIndex] = null;
    } else {
      this.expandedState[rowIndex] = columnKey;
    }
  }

  toggleExpand(item: any): void {
    item.expanded = !item.expanded;
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

  toggleParentSelection(item: any): void {
    item.selected = !item.selected; // now you handle flipping
    if (item.children && item.children.length) {
      item.children.forEach((child: any) => {
        child.selected = item.selected;
      });
    }

    this.checkAllSelected();
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

pass_queryparams(key: string, value: any) {
  const queryParams: any = {};
  queryParams[key] = {value};
  this.router.navigate([], {
    relativeTo: this.ar,
    queryParams: queryParams,
    queryParamsHandling: 'merge', // optional: merges with existing params
  });
}

updateFilters(column: any) {
  const selectedFilters = column.filter_options
    .filter((opt:any) => opt.checked)
    .map((opt:any) => opt.name)
    .join(','); // Convert array to comma-separated string

  this.pass_queryparams(column.key, selectedFilters);
}

get_seleted_ids(event:any){
  console.log(event);
  
}

}