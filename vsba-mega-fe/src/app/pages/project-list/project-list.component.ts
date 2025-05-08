import { Component, inject, ViewChild } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { HeaderComponent } from '../../components/header/header.component';
import { GlobalService } from '../../services/global.service';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ToggleTabsComponent } from '../../components/toggle-tabs/toggle-tabs.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ConfirmationPopupComponent } from '../../components/confirmation-popup/confirmation-popup.component';
import { title } from 'process';

@Component({
  selector: 'app-project-list',
  imports: [ListComponent, HeaderComponent, SearchInputComponent, ToggleTabsComponent, ButtonComponent, RouterLink, CommonModule, ConfirmationPopupComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  standalone: true,
})
export class ProjectListComponent {
  ar = inject(ActivatedRoute)
  constructor(public gs: GlobalService, public route: Router, public ps: ProjectService) { }
  @ViewChild('delete_project_row') delete_project_row: any
  params: any = {}
  list: any = {};
  items: any[] = []
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 50;
  filter= false;
  columns: any = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Project Name', type: 'Value', key: 'name', class: 'text-left', plus_icon: true },
    { title: 'Project Code', type: 'Value', key: 'short_name',  class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left', sort: true },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left', sort: true, sticky : true },
    { title: 'Start Date', type: 'Value', key: 'project_start_date', class: 'text-left', sort: true },
    { title: 'End Date', type: 'Value', key: 'project_end_date', class: 'text-left', sort: true },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
    {
      title: 'Action', type: 'Action', actions: [
        { title: 'View', icon: '../../../assets/view_icon.svg', action: this.view.bind(this) },
        { title: 'Edit', icon: '../../../assets/edit_icon.svg', action: this.edit.bind(this) },
        { title: 'Disable', icon: '../../../assets/Disable.svg', action: this.edit.bind(this) },
        { title: 'Delete', icon: '../../../assets/delete_icon_red.svg', action: this.delete.bind(this) },
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
      name: 'Rejected',
      action: () => {
        this.active_tab = 'Rejected';
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
    console.log(item, index, "item");
    this.route.navigate(['/project/form'], { queryParams: { id: item.id, type: 'Project',parent_id:item.parent_id } });
  }
  async view(item: any, index: any) {
    console.log(item, index, "item");
    this.route.navigate(['/project/form'], { queryParams: { id: item.id, type: 'Project', view: 'true' } });
  }
  selected_delete_project: any = {}
  async delete(item: any, index: any) {
    this.delete_project_row.open()
    this.selected_delete_project = item
  }
  async delet_project() {
    try {
      let data = await this.ps?.delete(this.selected_delete_project.id);
      await this.get_project(this.params)
    } catch (error: any) {
      // this.gs.toastr_shows_function(error?.error?.message, 'Error', 'error')
    }
  }
  async ngOnInit() {
    this.params.page = this.currentPage;
    this.params.page_size = this.itemsPerPage;
    this.ar.queryParams.subscribe(async (params) => {
      this.params = params;
      await this.get_project(this.params);
    })
  }

  redirect_to_project() {

  }
  async get_project(params: any) {
    try {
      // const queryParams = { ...params, page: this.currentPage, };
      const response = await this.ps.get_list(params);
      this.totalItems = response?.count || 0;
      const apiData = response?.data || [];
      this.items = apiData;
    } catch (error: any) {
      console.error(error?.message, '');
      this.items = [];
    }
  }

}
