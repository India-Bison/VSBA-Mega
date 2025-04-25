import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input, ViewChildren } from '@angular/core';
import { PaginationComponent } from "../pagination/pagination.component";
import { GlobalService } from '../../services/global.service';

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
    { title: 'Type', type: 'Value', key: 'audit_required', sort: true, class: 'text-left' },
    { title: 'Name', type: 'Value', key: 'description', sort: true, class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left' },
    { title: 'Slot Type', type: 'Value', key: 'project_name', class: 'text-left' },
    { title: 'Start Date-End Date', type: 'Value', key: 'project_start_date', class: 'text-left' },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
  ];
  constructor(public gs:GlobalService){}
  ngOnInit(): void {
    this.items = this.gs.items;
    console.log(this.items, 'Items in List Component');
    console.log(this.gs.items, 'Items in Global Service');
    
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
  
}