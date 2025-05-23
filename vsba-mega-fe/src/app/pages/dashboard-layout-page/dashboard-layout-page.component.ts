import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-dashboard-layout-page',
    imports: [SidebarComponent, RouterOutlet, HeaderComponent],
    templateUrl: './dashboard-layout-page.component.html',
    styleUrl: './dashboard-layout-page.component.css',
    standalone: true,
})
export class DashboardLayoutPageComponent {

}
