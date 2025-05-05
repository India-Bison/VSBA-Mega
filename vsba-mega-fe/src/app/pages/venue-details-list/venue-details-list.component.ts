import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ListComponent } from '../../components/list/list.component';
import { ToggleTabsComponent } from '../../components/toggle-tabs/toggle-tabs.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ConfirmationPopupComponent } from '../../components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-venue-details-list',
  imports: [HeaderComponent, ListComponent, ToggleTabsComponent, SearchInputComponent, ConfirmationPopupComponent],
  standalone: true,
  templateUrl: './venue-details-list.component.html',
})
export class VenueDetailsListComponent {

  columns = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Venue Name (code)', type: 'Value', key: 'venue_name', class: 'text-left', sort: true },
    { title: 'Project Name (Code)', type: 'Value', key: 'project_name', class: 'text-left' },
    { title: 'Computers Offered', type: 'Value', key: 'computers_offered', class: 'text-left', sort: true },
    { title: 'Computers Available', type: 'Value', key: 'computers_available', class: 'text-left', sort: true },
    { title: 'Seats in Classrooms', type: 'Value', key: 'seats_classrooms', class: 'text-left', sort: true },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left', },
    {
      title: 'Action',
      type: 'Action',
      actions: [
        { title: 'View', icon: '../../../assets/view_icon.svg', action: this.view.bind(this) },
        { title: 'Edit', icon: '../../../assets/edit_icon.svg', action: this.edit.bind(this) },
        { title: 'Disable', icon: '../../../assets/Disable.svg', action: this.disable.bind(this) },
        { title: 'Delete', icon: '../../../assets/delete_icon_red.svg', action: this.delete.bind(this) }
      ]
    }
  ];

  items = [
    {
      index: '1',
      venue_name: 'Vibgyor group of school malad',
      project_name: 'MHCET',
      computers_offered: '120',
      computers_available: '120',
      seats_classrooms: '120',
      status: 'Active',

    },
    {
      index: '2',
      venue_name: 'Vibgyor group of school malad',
      project_name: 'MHCET',
      computers_offered: '120',
      computers_available: '120',
      seats_classrooms: '120',
      status: 'Active',

    },
    {
      index: '3',
      venue_name: 'Vibgyor group of school malad',
      project_name: 'MHCET',
      computers_offered: '120',
      computers_available: '120',
      seats_classrooms: '120',
      status: 'Active',

    },
    {
      index: '4',
      venue_name: 'Vibgyor group of school malad',
      project_name: 'MHCET',
      computers_offered: '120',
      computers_available: '120',
      seats_classrooms: '120',
      status: 'Active',

    },
    {
      index: '5',
      venue_name: 'Vibgyor group of school malad',
      project_name: 'MHCET',
      computers_offered: '120',
      computers_available: '120',
      seats_classrooms: '120',
      status: 'In-Active',

    },
    {
      index: '6',
      venue_name: 'Vibgyor group of school malad',
      project_name: 'MHCET',
      computers_offered: '120',
      computers_available: '120',
      seats_classrooms: '120',
      status: 'Active',

    },

  ];

  params = {
    status: 'All'
  };

  view(item: any) {
    console.log('Viewing:', item);
  }

  edit(item: any) {
    console.log('Editing:', item);
  }

  disable(item: any) {
    console.log('Disabling:', item);
  }

  delete(item: any) {
    console.log('Deleting:', item);
  }

  tabList = [
    {
      name: 'All',
      action: () => {
        this.params.status = 'All';
        console.log('All tab clicked');
      }
    },
    {
      name: 'Active',
      action: () => {
        this.params.status = 'Active';
        console.log('Active tab clicked');
      }
    },
    {
      name: 'In-Active',
      action: () => {
        this.params.status = 'In-Active';
        console.log('In-Active tab clicked');
      }
    },

  ];
}
