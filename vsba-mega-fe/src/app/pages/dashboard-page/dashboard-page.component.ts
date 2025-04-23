import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MultiSearchComponent } from '../../components/multi-search/multi-search.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [HeaderComponent,MultiSearchComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
