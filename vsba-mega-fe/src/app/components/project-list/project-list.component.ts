import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ListComponent,HeaderComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

}
