import { Component, inject } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { HeaderComponent } from '../header/header.component';
import { GlobalService } from '../../services/global.service';
import { SearchInputComponent } from '../search-input/search-input.component';
import { ToggleTabsComponent } from '../toggle-tabs/toggle-tabs.component';
import { ButtonComponent } from '../button/button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [ListComponent, HeaderComponent, SearchInputComponent, ToggleTabsComponent, ButtonComponent, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  standalone: true,
})
export class ProjectListComponent {
  ar = inject(ActivatedRoute)
  constructor(public gs: GlobalService, public route: Router) { }
  params: any = {}
  columns: any = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Type', type: 'Value', key: 'slot_type', sort: true, class: 'text-left' },
    { title: 'Name', type: 'Value', key: 'project_name', sort: true, class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left' },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left' },
    { title: 'Start Date-End Date', type: 'startdate_enddate', key: 'project_start_date', class: 'text-left' },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
    {
      title: 'Action', type: 'Action', actions: [
        { title: 'Update', icon: 'bx bx-edit-alt', action: this.edit.bind(this) },
        // { title: 'Delete', icon: 'bx bx-trash', action: this.delete.bind(this) },,
      ]
    },
  ];
  active_tab = 'All';
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

  async edit(item: any, index: any) {
    this.route.navigate(['/project/form'], { queryParams: { id: item.id } });
  }
  ngOnInit() {
    this.ar.queryParams.subscribe((params) => {
      this.params = params;
    })
  }

  redirect_to_project() {

  }
}
