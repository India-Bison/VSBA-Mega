import { Component, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { app } from '../../../../server';
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ToggleTabsComponent } from '../../components/toggle-tabs/toggle-tabs.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ConfirmationPopupComponent } from '../../components/confirmation-popup/confirmation-popup.component';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { Router } from 'express';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [HeaderComponent, ListComponent, SearchInputComponent, ToggleTabsComponent, ButtonComponent, ConfirmationPopupComponent,CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {

}