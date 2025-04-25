import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { HeaderComponent } from '../header/header.component';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-project-list',
    imports: [ListComponent, HeaderComponent],
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.css',
    standalone: true,
})
export class ProjectListComponent {
constructor(public gs:GlobalService) {}
  params:any={}
  columns: any = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Type', type: 'Value', key: 'slot_type', sort: true, class: 'text-left' },
    { title: 'Name', type: 'Value', key: 'project_name', sort: true, class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left' },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left' },
    { title: 'Start Date-End Date', type: 'startdate_enddate', key: 'project_start_date', class: 'text-left' },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
  ];
}
