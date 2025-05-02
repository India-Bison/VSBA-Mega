import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard-layout-page',
    imports: [SidebarComponent, RouterOutlet],
    templateUrl: './dashboard-layout-page.component.html',
    styleUrl: './dashboard-layout-page.component.css',
    standalone: true,
})
export class DashboardLayoutPageComponent {

}
