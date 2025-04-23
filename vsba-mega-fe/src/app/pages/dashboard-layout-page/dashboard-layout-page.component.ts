import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout-page',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './dashboard-layout-page.component.html',
  styleUrl: './dashboard-layout-page.component.css'
})
export class DashboardLayoutPageComponent {

}
