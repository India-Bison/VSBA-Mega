import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ToggleTabsComponent } from '../../components/toggle-tabs/toggle-tabs.component';
import { ConfirmationPopupComponent } from '../../components/confirmation-popup/confirmation-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    HeaderComponent,
    ListComponent,
    SearchInputComponent,
    ToggleTabsComponent,
    ConfirmationPopupComponent,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  columns = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Sr. No.', type: 'Value', key: 'short_name', class: 'text-left', },
    { title: 'Name', type: 'Value', key: 'name', class: 'text-left' },
    { title: 'Role Name', type: 'Value', key: 'role_name', class: 'text-left' },
    { title: 'Contact', type: 'Value', key: 'contact', class: 'text-left', sort: true },
    { title: 'Email', type: 'Value', key: 'email', class: 'text-left', sort: true },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
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
      short_name: '1',
      name: 'Shahid Shaikh',
      role_name: 'Venue owner',
      contact: '+91-9832742331',
      email: 'lora.ipsum@gmail.com',
      status: 'Active'
    },
    {
      short_name: '2',
      name: 'Milo Doran',
      role_name: 'Venue owner',
      contact: '+91-9876543210',
      email: 'james.smith@example.com',
      status: 'Active'
    },
    {
      short_name: '3',
      name: 'Sienna Cross',
      role_name: 'venue manager',
      contact: '+91-9123456789',
      email: 'sarah.connor@example.com',
      status: 'Active'
    },
    {
      short_name: '4',
      name: 'Jaxon Faye',
      role_name: 'Auditor',
      contact: '+91-9988776655',
      email: 'michael.johnson@example.com',
      status: 'Active'
    },
    {
      short_name: '5',
      name: 'Talia Breeze',
      role_name: 'Venue owner',
      contact: '+91-9654321987',
      email: 'emily.davis@example.com',
      status: 'In-Active'
    },
    {
      short_name: '6',
      name: 'Rhea Cloud',
      role_name: 'Venue owner',
      contact: '+91-9506123456',
      email: 'robert.brown@example.com',
      status: 'Active'
    }

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
