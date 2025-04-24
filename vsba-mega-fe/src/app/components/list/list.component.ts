import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input, ViewChildren } from '@angular/core';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, UpperCasePipe, PaginationComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  params: any = {};
  items: any[] = [];
  currentPage = 1;
  totalPages = 1;
  totalItems = 3;
  itemsPerPage = 10;

  // State to track which column is expanded per row
  expandedState: { [rowIndex: number]: string | null } = {};

  columns: any = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Type', type: 'Value', key: 'type', sort: true, class: 'text-left' },
    { title: 'Name', type: 'Value', key: 'name', sort: true, class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left' },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left' },
    { title: 'Start Date-End Date', type: 'Value', key: 'startdate_enddate', class: 'text-left' },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
  ];

  ngOnInit(): void {
    this.loadDummyData();
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
            name: 'Rudra - Sub',
            resource_type: 'Lab A, Lab B',
            slot_type: 'Half Day',
            startdate_enddate: '15/03/2025 - 16/03/2025',
            status: 'Rejected'
          }
        ]
      },
      {
        id: 2,
        type: 'Project',
        name: 'Bhavesh',
        resource_type: 'Computer Labs, Classrooms, swimming pool',
        slot_type: 'Full Day',
        startdate_enddate: '12/03/2025 - 25/03/2025',
        status: 'Pending'
      },
      {
        id: 3,
        type: 'Project',
        name: 'Mayur',
        resource_type: 'Computer Labs, Classrooms, swimming pool',
        slot_type: 'Full Day',
        startdate_enddate: '12/03/2025 - 25/03/2025',
        status: 'Approved'
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
}