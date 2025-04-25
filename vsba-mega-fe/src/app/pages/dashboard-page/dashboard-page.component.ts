import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MultiSearchComponent } from '../../components/multi-search/multi-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { DateRangePickerComponent } from '../../components/date-range-picker/date-range-picker.component';

@Component({
    selector: 'app-dashboard-page',
    imports: [HeaderComponent, MultiSearchComponent, DateRangePickerComponent],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
