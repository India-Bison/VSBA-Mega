import { CommonModule, DatePipe, JsonPipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, ContentChildren, ElementRef, HostListener, Input, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [NgFor, NgIf, NgClass, UpperCasePipe, FormsModule,CommonModule,DatePipe],
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
  currentPage = 1;
  totalPages = 1;
  totalItems = 3;
  itemsPerPage = 10;
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

  ngAfterContentInit() {
    // Check if there are any content children
    this.isContentEmpty = this.projectedContent.length === 0;
  }

  // State to track which column is expanded per row
  expandedState: { [rowIndex: number]: string | null } = {};


  constructor(public gs: GlobalService, public router : Router) { }
  ngOnInit(): void {
    // this.items = this.gs.items
    //  this.loadDummyData();
    console.log(this.items, 'Items in List Component');
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
            status: 'Pending'
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

}