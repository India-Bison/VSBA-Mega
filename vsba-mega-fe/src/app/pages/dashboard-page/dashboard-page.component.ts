import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ConfirmationPopupComponent } from '../../components/confirmation-popup/confirmation-popup.component';

@Component({
    selector: 'app-dashboard-page',
    imports: [HeaderComponent,ConfirmationPopupComponent],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.css',
    standalone: true,
})
export class DashboardPageComponent {

}
