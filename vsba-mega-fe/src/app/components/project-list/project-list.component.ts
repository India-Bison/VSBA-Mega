import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-project-list',
    imports: [ListComponent, HeaderComponent],
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  params:any={}
  columns: any = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Type', type: 'Value', key: 'type', sort: true, class: 'text-left' },
    { title: 'Name', type: 'Value', key: 'name', sort: true, class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left' },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left' },
    { title: 'Start Date-End Date', type: 'startdate_enddate', key: 'project_start_date', class: 'text-left' },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
  ];
  items:any=[ {
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
    status: 'Pending'
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
      { type: 'Project',
        name: 'Shreeram',
        resource_type: 'Computer Labs, Classrooms, swimming pool',
        slot_type: 'Full Day',
        startdate_enddate: '12/03/2025 - 25/03/2025',
        status: 'Approved',}
    ]
  }]
}
