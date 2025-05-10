import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-dashboard-page',
    imports: [HeaderComponent],
    templateUrl: './dashboard-page.component.html',
    standalone: true,
})
export class DashboardPageComponent {
}
